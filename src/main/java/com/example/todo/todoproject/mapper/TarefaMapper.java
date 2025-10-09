package com.example.todo.todoproject.mapper;
import org.springframework.stereotype.Component;

import com.example.todo.todoproject.model.Tarefa;
import com.example.todo.todoproject.rest.dto.TarefaRequestDTO;

@Component
public class TarefaMapper {
    public Tarefa from(TarefaRequestDTO dto) {
        Tarefa tarefa = builder()
            .descricao(dto.descricao())
            .build();
    }
}
