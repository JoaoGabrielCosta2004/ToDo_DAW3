package com.example.todo.todoproject.model;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private UUID lookupId;

    @Column(nullable = false)
    private String descricao;

    @PrePersist
    private void init() {
        this.lookupId = UUID.randomUUID();
    }
}
