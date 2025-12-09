import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NovaTarefaPage from './pages/NovaTarefaPage';
import EditarTarefaPage from './pages/EditarTarefaPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nova" element={<NovaTarefaPage />} />
            <Route path="/editar/:id" element={<EditarTarefaPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
