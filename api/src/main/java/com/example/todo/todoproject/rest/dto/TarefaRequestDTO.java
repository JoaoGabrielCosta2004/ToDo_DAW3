package com.example.todo.todoproject.rest.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TarefaRequestDTO(
    @NotBlank(message = "A descrição da tarefa é obrigatória")
    @Size(min = 3, message = "A descrição deve ter pelo menos 3 caracteres")
    String descricao
) {} 
