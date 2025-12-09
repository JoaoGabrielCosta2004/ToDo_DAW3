import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import { tarefaService } from '../services/api';
import './EditarTarefaPage.css';

const EditarTarefaPage = () => {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const navigate = useNavigate();

  useEffect(() => {
    carregarTarefa();
  }, [id]);

  const carregarTarefa = async () => {
    try {
      setLoading(true);
      const dados = await tarefaService.buscarPorId(id);
      setTarefa(dados);
    } catch (error) {
      mostrarMensagem('erro', error.message || 'Erro ao carregar tarefa');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (dados) => {
    try {
      setSalvando(true);
      await tarefaService.atualizar(id, dados);
      mostrarMensagem('sucesso', 'Tarefa atualizada com sucesso!');
      setTimeout(() => {
        navigate('/', { state: { sucesso: 'Tarefa atualizada com sucesso!' } });
      }, 1500);
    } catch (error) {
      mostrarMensagem('erro', error.message || 'Erro ao atualizar tarefa');
      setSalvando(false);
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

  if (loading) {
    return (
      <div className="editar-tarefa-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="loading-container">
              <p>Carregando tarefa...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!tarefa) {
    return (
      <div className="editar-tarefa-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="error-container">
              <p>Tarefa não encontrada</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="editar-tarefa-page">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h2>Editar Tarefa</h2>
          </div>

          {mensagem.texto && (
            <div className={`mensagem ${mensagem.tipo}`}>
              {mensagem.texto}
            </div>
          )}

          <TaskForm
            tarefa={tarefa}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={salvando}
          />
        </div>
      </main>
    </div>
  );
};

export default EditarTarefaPage;

