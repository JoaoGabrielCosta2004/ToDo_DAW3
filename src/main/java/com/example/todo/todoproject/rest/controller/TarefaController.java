package com.example.todo.todoproject.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.todoproject.rest.dto.TarefaRequestDTO;
import com.example.todo.todoproject.rest.dto.TarefaResponseDTO;
import com.example.todo.todoproject.service.TarefaService;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    private final TarefaService service;
    public TarefaController(TarefaService service){
        this.service = service;
    }
    @GetMapping
    public List<TarefaResponseDTO> getAll(){
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public TarefaResponseDTO getById(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void salvar(){

    }

    @PutMapping("/{id}")
    public TarefaResponseDTO atualizar(@PathVariable Long id, @RequestBody TarefaRequestDTO dto){
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id){
        service.deletar(id);
    }
}
