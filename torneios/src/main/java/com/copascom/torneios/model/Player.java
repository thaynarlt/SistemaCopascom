// src/main/java/com/copascom/torneios/model/Player.java
package com.copascom.torneios.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "players")
@Getter
@Setter
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int shirtNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    // --- 👇 MUDANÇA PRINCIPAL AQUI ---

    /**
     * Relação Muitos-para-Muitos com Sport.
     * FetchType.LAZY: Os esportes só serão carregados do banco de dados quando
     * forem explicitamente acessados.
     * CascadeType.PERSIST e MERGE: Se salvarmos um novo jogador, as relações com
     * esportes existentes serão salvas também.
     */
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "player_sports", // Nome da tabela intermediária que ligará jogadores e esportes
            joinColumns = @JoinColumn(name = "player_id"), // Coluna que referencia o ID desta entidade (Player)
            inverseJoinColumns = @JoinColumn(name = "sport_name") // Coluna que referencia o ID da outra entidade
                                                                  // (Sport)
    )
    private Set<Sport> sports = new HashSet<>(); // Usar Set para garantir que não haja esportes duplicados para o mesmo
                                                 // jogador.
}