import axios from "axios";
import type { Tarefa } from "../interfaces/Tarefa";

const API_URL = "https://SEU-BACKEND.COM/tarefas"; // coloque o seu backend

export default {
  listar(): Promise<{ data: Tarefa[] }> {
    return axios.get(API_URL);
  },

  salvar(tarefa: Omit<Tarefa, "id">): Promise<{ data: Tarefa }> {
    return axios.post(API_URL, tarefa);
  },

  atualizar(id: number, tarefa: Partial<Tarefa>): Promise<{ data: Tarefa }> {
    return axios.put(`${API_URL}/${id}`, tarefa);
  },

  marcarFeito(id: number): Promise<{ data: Tarefa }> {
    return axios.patch(`${API_URL}/${id}`);
  },

  excluir(id: number): Promise<void> {
    return axios.delete(`${API_URL}/${id}`);
  }
};
