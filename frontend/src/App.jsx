import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { Plus, Search, BookUser, FileText, Download } from 'lucide-react';
import axios from 'axios';

import ContactForm from './components/ContactForm';
import Modal from './components/Modal';

const API_URL = "http://localhost:3000/api/";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}listar`);
        setContacts(response.data);
      } catch (error) {
        console.error("Erro ao carregar contatos:", error);
        toast.error("Erro ao buscar contatos do servidor.");
      }
    };
    fetchContacts();
  }, []);

  const handleAddContact = async () => {
  try {
    const response = await axios.get(`${API_URL}listar`);
    setContacts(response.data);
    toast.success('Contato adicionado com sucesso!');
  } catch (error) {
      console.error("Erro ao atualizar lista de contatos:", error);
      toast.error("Contato criado, mas erro ao atualizar lista.");
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      await axios.put(`${API_URL}editar/${updatedContact.id}`, updatedContact);

      setContacts(
        contacts.map((c) =>
          c.id === updatedContact.id ? { ...c, ...updatedContact } : c
        )
      );

      toast.success('Contato atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
      toast.error('Erro ao atualizar contato.');
    }
  };

  const handleDeleteContact = async (contactId) => {
    const contactToDelete = contacts.find(c => c.id === contactId);
    if (!contactToDelete) return;

    if (window.confirm(`Tem certeza que deseja excluir ${contactToDelete.nome}?`)) {
      try {
        await axios.delete(`${API_URL}removercontatos/${contactId}`);
        setContacts(contacts.filter(c => c.id !== contactId));
        const logEntry = `[${new Date().toLocaleString('pt-BR')}] Contato '${contactToDelete.nome}' foi excluído.`;
        setLogs(prevLogs => [logEntry, ...prevLogs]);
        setTimeout(()=>{
          toast.success('Contato excluído.');
        }, 500);
      } catch (error) {
        console.error("Erro ao excluir contato:", error);
        toast.error('Erro ao excluir contato. Tente novamente.');
      }
    }
  };

  const openModalForEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const openModalForAdd = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const downloadLogs = () => {
    const logContent = logs.join('\n');
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'log_contatos.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.info('Arquivo de log baixado.');
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.telefones.some(phone => phone.includes(searchTerm))
    );
  }, [contacts, searchTerm]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <BookUser className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Agenda Telefônica</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openModalForAdd}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
              >
                <Plus size={20} />
                <span>Novo Contato</span>
              </button>
              <button
                onClick={() => setShowLogs(!showLogs)}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition-colors duration-300"
                title="Ver Logs de Exclusão"
              >
                <FileText size={20} />
              </button>
            </div>
          </header>

          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {showLogs && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Logs de Exclusão</h2>
                {logs.length > 0 && (
                  <button
                    onClick={downloadLogs}
                    className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1 rounded-lg shadow hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} />
                    Baixar Log
                  </button>
                )}
              </div>
              {logs.length > 0 ? (
                <div className="max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg border">
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">{logs.join('\n')}</pre>
                </div>
              ) : (
                <p className="text-gray-500">Nenhum contato foi excluído ainda.</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map(contact => (
              <div key={contact.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{contact.nome}</h3>
                  <p className="text-gray-500">Idade: {contact.idade}</p>
                  <div className="mt-2 space-y-1">
                    {contact.telefones.map((phone, index) => (
                      <p key={index} className="text-gray-700 bg-gray-50 px-2 py-1 rounded-md">{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openModalForEdit(contact)}
                    className="flex-1 bg-yellow-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-yellow-600 transition-colors"
                  >
                    Alterar
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}

            {filteredContacts.length === 0 && searchTerm && (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">Nenhum contato encontrado para "{searchTerm}".</p>
              </div>
            )}

            {contacts.length === 0 && !searchTerm && (
              <div className="col-span-3 text-center py-10 bg-white rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Sua agenda está vazia</h3>
                <p className="text-gray-500 mt-2">Clique em "Novo Contato" para começar a adicionar pessoas.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm
          onSave={(contactData) => {
            if (editingContact) {
              handleUpdateContact({ ...editingContact, ...contactData });
            } else {
              handleAddContact(contactData);
            }
          }}
          onClose={closeModal}
          contactToEdit={editingContact}
        />
      </Modal>
    </>
  );
}

export default App;