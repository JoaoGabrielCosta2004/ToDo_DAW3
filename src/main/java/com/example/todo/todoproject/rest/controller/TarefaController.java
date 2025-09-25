package com.example.todo.todoproject.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {
    @GetMapping
    public void getAll(){
        
    }
}
