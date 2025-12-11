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
    <div v-if="editando" class="modal">
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

  mounted() {
    this.carregar();
  },

  methods: {
    async carregar() {
      const response = await tarefaService.listar();
      this.tarefas = response.data;
    },

    async adicionar() {
      if (!this.novaTarefa.trim()) return;

      await tarefaService.salvar({
        descricao: this.novaTarefa,
        feito: false
      });

      this.novaTarefa = "";
      this.carregar();
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
      this.carregar();
    },

    cancelarEdicao() {
      this.editando = false;
    },

    async excluirTarefa(id: number) {
      await tarefaService.excluir(id);
      this.carregar();
    },

    async marcarFeito(id: number) {
      await tarefaService.marcarFeito(id);
      this.carregar();
    }
  }
});
</script>

<style>
.container {
  width: 450px;
  margin: auto;
  padding-top: 40px;
  font-family: sans-serif;
}

.add-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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
