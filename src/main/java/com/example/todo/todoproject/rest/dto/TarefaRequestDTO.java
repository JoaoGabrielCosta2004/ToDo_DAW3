package com.example.todo.todoproject.rest.dto;
import jakarta.validation.constraints.NotNull;
public record TarefaRequestDTO(
    @NotNull String descricao
) {} 
