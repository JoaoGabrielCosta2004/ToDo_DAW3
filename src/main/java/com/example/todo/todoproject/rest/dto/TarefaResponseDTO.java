package com.example.todo.todoproject.rest.dto;
import java.util.UUID;

import lombok.Builder;

@Builder
public record TarefaResponseDTO(
    UUID lookupId,
    Long id,
    String descricao
){}