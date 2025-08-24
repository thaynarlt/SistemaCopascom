package com.copascom.torneios.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Times na partida ---
    @ManyToOne
    @JoinColumn(name = "team_a_id")
    private Team teamA;

    @ManyToOne
    @JoinColumn(name = "team_b_id")
    private Team teamB;

    // Resultado da partida
    private Integer scoreTeamA;
    private Integer scoreTeamB;

    @ManyToOne
    @JoinColumn(name = "winner_id")
    private Team winner;

    // --- Informações adicionais ---
    @Enumerated(EnumType.STRING)
    private MatchStatus status; // SCHEDULED, ONGOING, COMPLETED

    @ManyToOne
    @JoinColumn(name = "sport_id")
    private Sport sport; // Futebol, Basquete, Vôlei, etc.

    // --- Lógica do chaveamento ---
    private Integer round; // 1, 2, 3, ... (Oitavas, Quartas, Semifinais, Finais)

    @OneToOne
    @JoinColumn(name = "next_match_id")
    private Match nextMatch; // Próxima partida no chaveamento
}