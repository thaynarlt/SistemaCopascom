// src/main/java/com/copascom/torneios/model/Player.java
package com.copascom.torneios.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    // Muitos jogadores para um time.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    @JsonIgnore // Evita loops infinitos ao serializar para JSON
    private Team team;
}