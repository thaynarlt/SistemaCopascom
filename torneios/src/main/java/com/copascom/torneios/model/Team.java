// src/main/java/com/copascom/torneios/model/Team.java
package com.copascom.torneios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "teams")
@Getter
@Setter
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private TeamCategory category;

    // Um time pode ter múltiplos jogadores. Quando um time for deletado, os
    // jogadores associados também serão.
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Player> players = new ArrayList<>(); // Inicialize a lista aqui

    // Um time pode praticar múltiplos esportes, e um esporte pode ser praticado por
    // múltiplos times.
    @ManyToMany(fetch = FetchType.EAGER) // EAGER para carregar os esportes junto com o time
    @JoinTable(name = "team_sports", joinColumns = @JoinColumn(name = "team_id"), inverseJoinColumns = @JoinColumn(name = "sport_name")
    // Assume que o ID de Sport é o nome
    )
    private Set<Sport> sports;

    // Adicionado com base na sua lógica do frontend
    @JsonProperty("isCompeting")
    private boolean isCompeting;
}