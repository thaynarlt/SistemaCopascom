package com.copascom.torneios.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;
}