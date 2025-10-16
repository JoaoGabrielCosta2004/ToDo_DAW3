package com.example.todo.todoproject.mapper;
import org.springframework.stereotype.Component;

import com.example.todo.todoproject.model.Tarefa;
import com.example.todo.todoproject.rest.dto.TarefaRequestDTO;
import com.example.todo.todoproject.rest.dto.TarefaResponseDTO;

@Component
public class TarefaMapper {
    public Tarefa from(TarefaRequestDTO dto) {
        Tarefa tarefa = Tarefa.builder()
            .descricao(dto.descricao())
            .build();
        return tarefa;
    }
    public TarefaResponseDTO from(Tarefa entity){
        return TarefaResponseDTO.builder()
            .lookupId(entity.getLookupId())
            .descricao(entity.getDescricao())
            .build();
    }
}
