package com.example.todo.todoproject.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.todo.todoproject.mapper.TarefaMapper;
import com.example.todo.todoproject.model.Tarefa;
import com.example.todo.todoproject.repository.TarefaRepository;
import com.example.todo.todoproject.rest.dto.TarefaRequestDTO;
import com.example.todo.todoproject.rest.dto.TarefaResponseDTO;



@Repository

public class TarefaService {
    private final TarefaRepository repository;
    private final TarefaMapper mapper;
    public TarefaService(TarefaRepository repository, TarefaMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public TarefaResponseDTO salvar(TarefaRequestDTO dto) {
        Tarefa tarefa = mapper.from(dto);
        return mapper.from(repository.save(tarefa));
    }
    public List<TarefaResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(mapper::from)
                .toList();
    }
    public TarefaResponseDTO buscarPorId(Long id) {
        return repository.findById(id)
                .map(mapper::from)
                .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
    }
    public TarefaResponseDTO atualizarFeito(Long id){
        Tarefa tarefa = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
        tarefa.setFeito(!tarefa.getFeito());
        return mapper.from(repository.save(tarefa));
    }
    public TarefaResponseDTO atualizar(Long id, TarefaRequestDTO dto){
        Tarefa tarefa = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada"));
        tarefa.setDescricao(dto.descricao());
        return mapper.from(repository.save(tarefa));
    }
    public void deletar(Long id) {
        repository.deleteById(id);
    }

}
