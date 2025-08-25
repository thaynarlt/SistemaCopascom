// src/main/java/com/copascom/torneios/dto/TeamDTO.java
package com.copascom.torneios.dto;

import com.copascom.torneios.model.TeamCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class TeamDTO {
    private String name;
    private TeamCategory category;
    private boolean isCompeting;
    private Set<String> sports; // <-- A mágica está aqui!
    // Adicione este campo para receber os jogadores
    private List<PlayerDTO> players = new ArrayList<>(); // <-- O tipo `List` é usado AQUI
}