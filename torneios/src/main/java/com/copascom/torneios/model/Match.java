package com.copascom.torneios.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;
}