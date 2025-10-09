package com.example.todo.todoproject.service;

import org.springframework.stereotype.Repository;

import com.example.todo.todoproject.model.Tarefa;
import com.example.todo.todoproject.repository.TarefaRepository;
import com.example.todo.todoproject.rest.dto.TarefaRequestDTO;
import com.example.todo.todoproject.rest.dto.TarefaResponseDTO;



@Repository

public class TarefaService {
    private final TarefaRepository repository;
    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public TarefaResponseDTO salvar(TarefaRequestDTO dto) {
        Tarefa tarefa = mapper.from(dto);//arrumar aqui

    }

}
