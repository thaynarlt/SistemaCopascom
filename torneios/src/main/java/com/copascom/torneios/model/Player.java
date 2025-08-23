package com.copascom.torneios.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}