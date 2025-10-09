package com.example.todo.todoproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.todo.todoproject.model.Tarefa;
import java.util.UUID;


@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long>{
    // Busca por lookupId
    Tarefa findByLookupId(UUID lookupId);
}
