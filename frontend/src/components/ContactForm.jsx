import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { applyPhoneMask } from "../utils/phoneMask";

const ContactForm = ({ onSave, onClose, contactToEdit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phones, setPhones] = useState([""]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setAge(contactToEdit.age.toString());
      setPhones(contactToEdit.phones.length > 0 ? contactToEdit.phones : [""]);
    } else {
      setName("");
      setAge("");
      setPhones([""]);
    }
    setError("");
  }, [contactToEdit]);

  const handlePhoneChange = (index, value) => {
    const newPhones = [...phones];
    newPhones[index] = applyPhoneMask(value);
    setPhones(newPhones);
  };

  const addPhoneInput = () => {
    setPhones([...phones, ""]);
  };

  const removePhoneInput = (index) => {
    if (phones.length > 1) {
      setPhones(phones.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Funcionalidade de salvar contato desativada temporariamente.");
    return;
    // setError("");

    // if (!name.trim() || !age.trim())
    //   return setError("Nome e idade obrigatórios");
    // if (isNaN(parseInt(age)) || parseInt(age) <= 0)
    //   return setError("Idade inválida");

    // const validPhones = phones.map((p) => p.trim()).filter(Boolean);
    // if (validPhones.length === 0)
    //   return setError("É necessário ao menos um telefone");

    // // const contactData = { name, age: parseInt(age) };
    // const contactData = { nome: name, idade: parseInt(age) };

    // try {
    //   // Cria o contato
    //   const response = await fetch("http://localhost:3000/contatos/criar", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(contactData),
    //   });

    //   if (!response.ok) {
    //     const errData = await response.json();
    //     return setError(errData.error || "Erro ao salvar contato");
    //   }

    //   const savedContact = await response.json();

    //   // Salva os telefones
    //   await Promise.all(
    //     validPhones.map((numero) =>
    //       fetch("http://localhost:3000/telefones", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ idContato: savedContact.id, numero }),
    //       })
    //     )
    //   );

    //   onSave(savedContact);
    //   onClose();
    // } catch (err) {
    //   console.error(err);
    //   setError("Erro ao conectar com o servidor");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {contactToEdit ? "Editar Contato" : "Novo Contato"}
      </h2>
      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md">{error}</p>
      )}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Idade
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone(s)
        </label>
        <div className="space-y-2">
          {phones.map((phone, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="(xx) xxxxx-xxxx"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {phones.length > 1 && (
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
          onClick={handleSubmit}
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ContactForm;