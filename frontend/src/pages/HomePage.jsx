import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import { tarefaService } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [novaTarefa, setNovaTarefa] = useState('');
  const [modalEditar, setModalEditar] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      setLoading(true);
      setErro('');
      const dados = await tarefaService.listarTodas();
      setTarefas(dados);
    } catch (error) {
      setErro(error.message || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    try {
      setLoading(true);
      await tarefaService.criar({ descricao: novaTarefa });
      setNovaTarefa('');
      carregarTarefas();
    } catch (error) {
      setErro(error.message || 'Erro ao criar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir?')) return;
    try {
      setErro('');
      await tarefaService.excluir(id);
      carregarTarefas();
    } catch (error) {
      setErro(error.message || 'Erro ao excluir tarefa');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      setErro('');
      await tarefaService.atualizarStatus(id);
      carregarTarefas();
    } catch (error) {
      setErro(error.message || 'Erro ao atualizar status');
    }
  };

  const handleEditar = (tarefa) => {
    setTarefaEditando(tarefa);
    setModalEditar(true);
  };

  const handleSalvarEdicao = async (dados) => {
    try {
      setSalvando(true);
      setErro('');
      await tarefaService.atualizar(tarefaEditando.id, dados);
      setModalEditar(false);
      setTarefaEditando(null);
      carregarTarefas();
    } catch (error) {
      setErro(error.message || 'Erro ao atualizar tarefa');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="app-title">GERENCIADOR DE TAREFAS</h1>

        <form className="add-task-form" onSubmit={handleAdicionar}>
          <input
            type="text"
            placeholder="Adicionar uma nova tarefa"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !novaTarefa.trim()}>
            Adicionar
          </button>
        </form>

        {erro && <div className="error-message">{erro}</div>}

        <TaskList
          tarefas={tarefas}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEditar}
          loading={loading}
        />
      </div>

      <Modal
        isOpen={modalEditar}
        onClose={() => {
          setModalEditar(false);
          setTarefaEditando(null);
        }}
        title="Editar Tarefa"
      >
        <TaskForm
          tarefa={tarefaEditando}
          onSubmit={handleSalvarEdicao}
          onCancel={() => {
            setModalEditar(false);
            setTarefaEditando(null);
          }}
          loading={salvando}
        />
      </Modal>
    </div>
  );
};

export default HomePage;

