package com.copascom.torneios.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    // Relação inversa: Um esporte pode ter muitos times
    @OneToMany(mappedBy = "sport", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Team> teams;
}