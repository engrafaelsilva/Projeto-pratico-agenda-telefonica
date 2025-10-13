import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Trash2 } from "lucide-react";
import { applyPhoneMask } from "../utils/phoneMask";

const API_URL = "http://localhost:5000/api/contatos";

const ContactForm = ({ onSave, onClose, contactToEdit }) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefones, setTelefones] = useState([""]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Pré-carrega dados do contato para edição ---
  useEffect(() => {
    if (contactToEdit) {
      setNome(contactToEdit.nome || "");
      setIdade(contactToEdit.idade?.toString() || "");
      setTelefones(
        contactToEdit.telefones?.length > 0
          ? contactToEdit.telefones
          : [""]
      );
    } else {
      setNome("");
      setIdade("");
      setTelefones([""]);
    }
    setErro("");
  }, [contactToEdit]);

  // --- Atualiza telefone com máscara ---
  const handlePhoneChange = (index, value) => {
    const novosTelefones = [...telefones];
    novosTelefones[index] = applyPhoneMask(value);
    setTelefones(novosTelefones);
  };

  // --- Adiciona novo campo de telefone ---
  const addPhoneInput = () => setTelefones([...telefones, ""]);

  // --- Remove campo de telefone ---
  const removePhoneInput = (index) => {
    if (telefones.length > 1) {
      setTelefones(telefones.filter((_, i) => i !== index));
    }
  };

  // --- Submissão (criar ou editar) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const payload = {
      nome: nome.trim(),
      idade: parseInt(idade, 10),
      telefones: telefones.filter((t) => t.trim() !== ""),
    };

    if (!payload.nome || !payload.idade) {
      setErro("Nome e idade são obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      if (contactToEdit?.id) {
        // Atualizar contato existente
        await axios.put(`${API_URL}/${contactToEdit.id}`, payload);
        alert("Contato atualizado com sucesso!");
      } else {
        // Criar novo contato
        await axios.post(API_URL, payload);
        alert("Contato criado com sucesso!");
      }

      onSave(); // Atualiza a lista principal
      onClose(); // Fecha o modal
    } catch (err) {
      console.error("❌ Erro ao salvar contato:", err);
      setErro("Erro ao salvar contato. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // --- Renderização ---
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {contactToEdit ? "Editar Contato" : "Novo Contato"}
      </h2>

      {erro && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md">
          {erro}
        </p>
      )}

      {/* Campo: Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Campo: Idade */}
      <div>
        <label htmlFor="idade" className="block text-sm font-medium text-gray-700">
          Idade
        </label>
        <input
          type="number"
          id="idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Campo: Telefones */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone(s)
        </label>

        <div className="space-y-2">
          {telefones.map((telefone, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="tel"
                value={telefone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="(xx) xxxxx-xxxx"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {telefones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhoneInput(index)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                  title="Remover telefone"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPhoneInput}
          className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <PlusCircle size={18} />
          Adicionar outro telefone
        </button>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4 border-t mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;