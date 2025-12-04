package com.example.todo.todoproject.rest.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
public record TarefaRequestDTO(
    @NotBlank String descricao
) {} 
