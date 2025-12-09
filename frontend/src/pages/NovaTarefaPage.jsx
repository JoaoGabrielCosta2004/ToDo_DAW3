import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import { tarefaService } from '../services/api';
import './NovaTarefaPage.css';

const NovaTarefaPage = () => {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const navigate = useNavigate();

  const handleSubmit = async (dados) => {
    try {
      setLoading(true);
      await tarefaService.criar(dados);
      mostrarMensagem('sucesso', 'Tarefa criada com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      mostrarMensagem('erro', error.message || 'Erro ao criar tarefa');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto });
    setTimeout(() => {
      setMensagem({ tipo: '', texto: '' });
    }, 3000);
  };

  return (
    <div className="nova-tarefa-page">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h2>Nova Tarefa</h2>
          </div>

          {mensagem.texto && (
            <div className={`mensagem ${mensagem.tipo}`}>
              {mensagem.texto}
            </div>
          )}

          <TaskForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default NovaTarefaPage;

