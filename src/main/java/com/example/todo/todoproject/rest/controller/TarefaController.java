package com.example.todo.todoproject.rest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.todoproject.service.TarefaService;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    private final TarefaService service;
    public TarefaController(TarefaService service){
        this.service = service;
    }
    @GetMapping
    public void getAll(){
        
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void salvar(){

    }

    @PutMapping
    public void atualizar(){

    }

    @DeleteMapping
    public void remover(){

    }
}
