package com.copascom.torneios.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "sport_id")
    private Sport sport;
}