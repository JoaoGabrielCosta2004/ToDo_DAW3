<template>
  <div class="task">
    <input type="checkbox" :checked="tarefa.feito" @change="toggleFeito" />

    <span :class="{ done: tarefa.feito }">{{ tarefa.descricao }}</span>

    <button @click="editar">Editar</button>
    <button @click="excluir" class="delete">Excluir</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Tarefa } from "../interfaces/Tarefa";

export default defineComponent({
  name: "TaskItem",

  props: {
    tarefa: {
      type: Object as () => Tarefa,
      required: true
    }
  },

  emits: ["editar", "excluir", "feito"],

  methods: {
    editar() {
      this.$emit("editar", this.tarefa);
    },
    excluir() {
      this.$emit("excluir", this.tarefa.id);
    },
    toggleFeito() {
      this.$emit("feito", this.tarefa.id);
    }
  }
});
</script>

<style scoped>
.task {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.done {
  text-decoration: line-through;
  color: gray;
}
button {
  padding: 4px 8px;
}
.delete {
  background-color: #ff6b6b;
  color: white;
}
</style>
