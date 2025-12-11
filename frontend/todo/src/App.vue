<template>
  <div class="container">
    <h1>GERENCIADOR DE TAREFAS</h1>

    <div class="add-box">
      <input 
        v-model="novaTarefa" 
        placeholder="Adicionar uma nova tarefa"
        @keyup.enter="adicionar"
      />
      <button @click="adicionar">Adicionar</button>
    </div>

    <div class="lista">
      <TaskItem 
        v-for="t in tarefas" 
        :key="t.id"
        :tarefa="t"
        @editar="editarTarefa"
        @excluir="excluirTarefa"
        @feito="marcarFeito"
      />
    </div>

    <!-- Modal -->
    <div v-if="editando" class="modal" @click.self="cancelarEdicao">
      <div class="modal-content">
        <h3>Editar Tarefa</h3>
        <input v-model="editDescricao" />
        <button @click="confirmarEdicao">Salvar</button>
        <button class="cancel" @click="cancelarEdicao">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskItem from "./components/TaskItem.vue";
import tarefaService from "./services/TarefaService";
import type { Tarefa } from "./interfaces/Tarefa";

export default defineComponent({
  components: { TaskItem },

  data() {
    return {
      tarefas: [] as Tarefa[],
      novaTarefa: "",
      editando: false,
      tarefaEditando: null as Tarefa | null,
      editDescricao: ""
    };
  },

  async mounted() {
    await this.carregar();
  },

  methods: {
    async carregar() {
      try {
        const response = await tarefaService.listar();
        console.log("Tarefas carregadas:", response.data);
        this.tarefas = response.data;
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    },

    async adicionar() {
      if (!this.novaTarefa.trim()) return;

      await tarefaService.salvar({
        descricao: this.novaTarefa,
        feito: false
      });

      this.novaTarefa = "";
      await this.carregar();
    },

    editarTarefa(tarefa: Tarefa) {
      this.editando = true;
      this.tarefaEditando = tarefa;
      this.editDescricao = tarefa.descricao;
    },

    async confirmarEdicao() {
      if (!this.tarefaEditando) return;

      await tarefaService.atualizar(this.tarefaEditando.id, {
        descricao: this.editDescricao
      });

      this.editando = false;
      this.tarefaEditando = null;
      await this.carregar();
    },

    cancelarEdicao() {
      this.editando = false;
      this.tarefaEditando = null;
    },

    async excluirTarefa(id: number) {
      await tarefaService.excluir(id);
      await this.carregar();
    },

    async marcarFeito(id: number) {
      await tarefaService.marcarFeito(id);
      await this.carregar();
    }
  }
});
</script>

<style>
body {
  background: #f3f3f3;
}

.container {
  width: 450px;
  margin: auto;
  padding-top: 40px;
  font-family: sans-serif;
}

h1 {
  text-align: center;
}

.add-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-box input {
  flex: 1;
  padding: 8px;
}

.add-box button {
  padding: 8px 14px;
}

.lista {
  margin-top: 20px;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 300px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cancel {
  background: #ccc;
}
</style>
