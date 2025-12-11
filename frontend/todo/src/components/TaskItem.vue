<template>
  <div class="task">
    <input 
      type="checkbox"
      :checked="tarefa.feito"
      @change="$emit('feito', tarefa.id)"
    />

    <span :class="{ feito: tarefa.feito }">
      {{ tarefa.descricao }}
    </span>

    <div class="buttons">
      <button @click="$emit('editar', tarefa)">Editar</button>
      <button @click="$emit('excluir', tarefa.id)" class="danger">Excluir</button>
    </div>
  </div>
</template>

<script lang="ts">
import type { Tarefa } from "../interfaces/Tarefa";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tarefa: {
      type: Object as () => Tarefa,
      required: true
    }
  }
});
</script>

<style scoped>
.task {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
  background: #fafafa;
}

.feito {
  text-decoration: line-through;
  color: #999;
}

.buttons {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

button {
  padding: 4px 10px;
  background: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #ddd;
}

button.danger {
  background: #f4b4b4;
}

button.danger:hover {
  background: #e59898;
}
</style>
