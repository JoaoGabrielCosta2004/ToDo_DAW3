package com.example.todo.todoproject.repository;

import org.springframework.stereotype.Repository;
import com.example.todo.todoproject.model.Tarefa;
import java.util.UUID;


@Repository
public interface TarefaRepository {
    // Busca por lookupId
    Tarefa findByLookupId(UUID lookupId);
}
