// src/main/java/com/copascom/torneios/controller/TeamController.java
package com.copascom.torneios.controller;

import com.copascom.torneios.dto.PlayerDTO;
import com.copascom.torneios.dto.TeamDTO;
import com.copascom.torneios.model.Player;
import com.copascom.torneios.model.Sport;
import com.copascom.torneios.model.Team;
import com.copascom.torneios.repository.PlayerRepository;
import com.copascom.torneios.repository.SportRepository;
import com.copascom.torneios.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "http://localhost:5173") // Confirme a porta do seu frontend
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private SportRepository sportRepository;

    // --- MÉTODOS PARA TIMES ---

    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @PostMapping
    public Team createTeam(@RequestBody TeamDTO teamDTO) {
        // 1. Cria a entidade Team principal
        Team newTeam = new Team();
        newTeam.setName(teamDTO.getName());
        newTeam.setCategory(teamDTO.getCategory());
        newTeam.setCompeting(teamDTO.isCompeting());

        // 2. Associa os Esportes
        if (teamDTO.getSports() != null && !teamDTO.getSports().isEmpty()) {
            Set<Sport> sportsEntities = new HashSet<>(sportRepository.findAllById(teamDTO.getSports()));
            newTeam.setSports(sportsEntities);
        }

        // 3. Cria os jogadores e estabelece a relação bidirecional
        if (teamDTO.getPlayers() != null && !teamDTO.getPlayers().isEmpty()) {
            List<Player> playerEntities = teamDTO.getPlayers().stream().map(playerDTO -> {
                Player player = new Player();
                player.setName(playerDTO.getName());
                player.setShirtNumber(playerDTO.getShirtNumber());
                player.setTeam(newTeam); // Associa o filho (Player) ao pai (Team)
                return player;
            }).collect(Collectors.toList());

            newTeam.setPlayers(playerEntities); // Associa o pai (Team) aos filhos (Players)
        }

        // 4. Salva o time. O JPA salvará os jogadores em cascata.
        // A resposta já virá com a lista de jogadores correta.
        return teamRepository.save(newTeam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody TeamDTO teamDTO) {
        return teamRepository.findById(id).map(teamToUpdate -> {
            // Atualiza os dados do DTO para a entidade
            teamToUpdate.setName(teamDTO.getName());
            teamToUpdate.setCategory(teamDTO.getCategory());
            teamToUpdate.setCompeting(teamDTO.isCompeting());

            if (teamDTO.getSports() != null) {
                Set<Sport> sportsEntities = new HashSet<>(sportRepository.findAllById(teamDTO.getSports()));
                teamToUpdate.setSports(sportsEntities);
            }

            Team updatedTeam = teamRepository.save(teamToUpdate);
            return ResponseEntity.ok(updatedTeam);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        return teamRepository.findById(id).map(team -> {
            teamRepository.delete(team);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- MÉTODO PARA JOGADORES ---

    @PostMapping("/{teamId}/players")
    public ResponseEntity<Player> addPlayerToTeam(@PathVariable Long teamId, @RequestBody PlayerDTO playerDTO) {
        // 1. Encontra o time ao qual o jogador pertencerá
        return teamRepository.findById(teamId).map(team -> {
            // 2. Cria uma nova entidade Player
            Player newPlayer = new Player();
            newPlayer.setName(playerDTO.getName());
            newPlayer.setShirtNumber(playerDTO.getShirtNumber());
            newPlayer.setTeam(team); // 3. Associa o jogador ao time

            // 4. Salva o novo jogador no banco
            Player savedPlayer = playerRepository.save(newPlayer);
            return ResponseEntity.ok(savedPlayer);
        }).orElse(ResponseEntity.notFound().build()); // Retorna 404 se o time não for encontrado
    }
}