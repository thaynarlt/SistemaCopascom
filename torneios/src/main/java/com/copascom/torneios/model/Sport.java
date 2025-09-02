// src/main/java/com/copascom/torneios/model/Sport.java
package com.copascom.torneios.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sports")
@Getter
@Setter
public class Sport {

    @Id
    private String name; // Ex: "FUTSAL", "VOLEI", etc.

    // --- 👇 MUDANÇA ADICIONAL AQUI ---

    /**
     * Relação inversa com Player.
     * mappedBy = "sports": Indica que a entidade Player é a dona da relação.
     * O JPA procurará a configuração @JoinTable na propriedade "sports" da classe
     * Player.
     * JsonIgnore: Essencial para evitar um loop infinito de serialização (Sport ->
     * Players -> Sports -> ...).
     */
    @ManyToMany(mappedBy = "sports")
    @JsonIgnore
    private Set<Player> players = new HashSet<>();
}