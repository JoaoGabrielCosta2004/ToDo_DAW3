import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>📋 ToDo App</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Lista de Tarefas
          </Link>
          <Link to="/nova" className="nav-link btn-primary">
            + Nova Tarefa
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;


