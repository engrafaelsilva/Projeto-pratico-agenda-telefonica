import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { applyPhoneMask } from "../utils/phoneMask";
import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const ContactForm = ({ onSave, onClose, contactToEdit }) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefones, setTelefones] = useState([""]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      setNome(contactToEdit.nome || "");
      setIdade(contactToEdit.idade?.toString() || "");
      setTelefones(
        contactToEdit.telefones?.length > 0 ? contactToEdit.telefones : [""]
      );
    } else {
      setNome("");
      setIdade("");
      setTelefones([""]);
    }
    setErro("");
    setSucesso("");
  }, [contactToEdit]);

  const handlePhoneChange = (index, value) => {
    const novosTelefones = [...telefones];
    novosTelefones[index] = applyPhoneMask(value);
    setTelefones(novosTelefones);
  };

  const addPhoneInput = () => setTelefones([...telefones, ""]);

  const removePhoneInput = (index) => {
    if (telefones.length > 1) {
      setTelefones(telefones.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
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
      if (contactToEdit) {
        await axios.put(`${API_URL}editar/${contactToEdit.id}`, payload);
        setSucesso("Contato atualizado com sucesso!");
        onSave(payload);
      } else {
        const response = await axios.post(`${API_URL}criarcontato`, payload);
        setSucesso("Contato cadastrado com sucesso!");
        onSave(response.data);
      }

      setTimeout(() => onClose(), 800);
    } catch (err) {
      console.error("Erro ao salvar contato:", err);
      setErro(
        err.response?.data?.message ||
          "Erro de conexão com o servidor. Verifique se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {contactToEdit ? "Editar Contato" : "Novo Contato"}
      </h2>

      {erro && (
        <p className="text-red-600 text-sm bg-red-50 p-2 rounded-md">{erro}</p>
      )}

      {sucesso && (
        <p className="text-green-600 text-sm bg-green-50 p-2 rounded-md">
          {sucesso}
        </p>
      )}

      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700"
        >
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

      <div>
        <label
          htmlFor="idade"
          className="block text-sm font-medium text-gray-700"
        >
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