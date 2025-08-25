package com.copascom.torneios.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "sports")
@Getter
@Setter
public class Sport {
    @Id
    private String name; // Ex: "FUTSAL", "VOLEI", etc.
}