import './TaskCard.css';

const TaskCard = ({ tarefa, onDelete, onToggleStatus, onEdit }) => {
  return (
    <div className="task-item">
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={tarefa.feito}
          onChange={() => onToggleStatus(tarefa.id)}
        />
      </div>

      <div className={`task-content ${tarefa.feito ? 'completed' : ''}`}>
        {tarefa.descricao}
      </div>

      <div className="task-actions">
        <button
          className="btn-action btn-edit"
          onClick={() => onEdit(tarefa)}
          title="Editar"
        >
          Editar
        </button>
        <button
          className="btn-action btn-delete"
          onClick={() => onDelete(tarefa.id)}
          title="Excluir"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskCard;


