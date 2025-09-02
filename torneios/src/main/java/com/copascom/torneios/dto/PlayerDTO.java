// Crie este arquivo em um novo pacote, ex: com.copascom.torneios.dto
package com.copascom.torneios.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PlayerDTO {
    private String name;
    private int shirtNumber;
    private List<String> sports; // <-- Recebe a lista de nomes dos esportes do frontend
}