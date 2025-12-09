import axios from 'axios';

// Configuração base da API
const API_BASE_URL = '/api/tarefas';

// Instância do Axios configurada
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro com resposta do servidor
      const status = error.response.status;
      const message = error.response.data?.message || (typeof error.response.data === 'string' ? error.response.data : 'Erro ao processar requisição');
      throw new Error(`Erro ${status}: ${message}`);
    } else if (error.request) {
      // Erro de rede
      throw new Error('Erro de conexão. Verifique se o servidor está rodando.');
    } else {
      // Outro tipo de erro
      throw new Error('Erro inesperado');
    }
  }
);

// Serviços de Tarefa
export const tarefaService = {
  // Listar todas as tarefas
  async listarTodas() {
    try {
      const response = await api.get('');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar tarefa por ID
  async buscarPorId(id) {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Criar nova tarefa
  async criar(tarefa) {
    try {
      const response = await api.post('', tarefa);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar tarefa
  async atualizar(id, tarefa) {
    try {
      const response = await api.put(`/${id}`, tarefa);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar apenas o status (feito)
  async atualizarStatus(id) {
    try {
      const response = await api.patch(`/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Excluir tarefa
  async excluir(id) {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default api;


