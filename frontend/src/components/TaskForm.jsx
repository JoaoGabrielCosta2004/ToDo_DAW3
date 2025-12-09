import { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ tarefa, onSubmit, onCancel, loading }) => {
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (tarefa) {
      setDescricao(tarefa.descricao || '');
    }
  }, [tarefa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    // Validação
    if (!descricao.trim()) {
      setErro('A descrição da tarefa é obrigatória');
      return;
    }

    if (descricao.trim().length < 3) {
      setErro('A descrição deve ter pelo menos 3 caracteres');
      return;
    }

    onSubmit({ descricao: descricao.trim() });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="descricao">Descrição da Tarefa *</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
            setErro('');
          }}
          placeholder="Digite a descrição da tarefa..."
          rows="4"
          disabled={loading}
          className={erro ? 'error' : ''}
        />
        {erro && <span className="error-message">{erro}</span>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel" disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Salvando...' : tarefa ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;


