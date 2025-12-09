import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tarefas, onDelete, onToggleStatus, onEdit, loading }) => {
  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="spinner"></div>
        <p>Carregando tarefas...</p>
      </div>
    );
  }

  if (!tarefas || tarefas.length === 0) {
    return (
      <div className="task-list-empty">
        <p>📝 Nenhuma tarefa cadastrada ainda.</p>
        <p>Crie sua primeira tarefa clicando em "Nova Tarefa"!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tarefas.map((tarefa) => (
        <TaskCard
          key={tarefa.id}
          tarefa={tarefa}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;


