package com.copascom.torneios.controller;

import com.copascom.torneios.dto.PlayerDTO;
import com.copascom.torneios.dto.TeamDTO;
import com.copascom.torneios.model.Player;
import com.copascom.torneios.model.Team;
import com.copascom.torneios.service.TeamService; // Importa o novo serviço
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "http://localhost:5173")
public class TeamController {

    // AGORA: Injeta apenas o TeamService.
    @Autowired
    private TeamService teamService;

    // --- MÉTODOS PARA TIMES ---

    @GetMapping
    public List<Team> getAllTeams() {
        // Delega a busca para o serviço
        return teamService.getAllTeams();
    }

    @PostMapping
    public Team createTeam(@RequestBody TeamDTO teamDTO) {
        // Delega a criação para o serviço
        return teamService.createTeam(teamDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody TeamDTO teamDTO) {
        try {
            Team updatedTeam = teamService.updateTeam(id, teamDTO);
            return ResponseEntity.ok(updatedTeam);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        try {
            teamService.deleteTeam(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // --- MÉTODO PARA JOGADORES (AGORA CORRETO E NO LUGAR CERTO) ---

    @PostMapping("/{teamId}/players")
    public ResponseEntity<Player> addPlayerToTeam(@PathVariable Long teamId, @RequestBody PlayerDTO playerDTO) {
        try {
            // Delega a lógica complexa para o serviço
            Player savedPlayer = teamService.addPlayerToTeam(teamId, playerDTO);
            return ResponseEntity.ok(savedPlayer);
        } catch (Exception e) {
            // Retorna 404 se o time ou um esporte não for encontrado
            return ResponseEntity.notFound().build();
        }
    }
}