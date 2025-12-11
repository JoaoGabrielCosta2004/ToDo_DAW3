package com.example.todo.todoproject.rest.dto;
import jakarta.validation.constraints.NotBlank;
public record TarefaRequestDTO(
    @NotBlank String descricao
) {} 
