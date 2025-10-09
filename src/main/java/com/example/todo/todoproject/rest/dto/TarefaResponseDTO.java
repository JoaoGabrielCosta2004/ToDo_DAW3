package com.example.todo.todoproject.rest.dto;
import java.util.UUID;

public record TarefaResponseDTO(
    UUID lookupId,
    String descricao
){}