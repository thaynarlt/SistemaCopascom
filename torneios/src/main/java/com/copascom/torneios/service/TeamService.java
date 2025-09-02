package com.copascom.torneios.service;

import com.copascom.torneios.dto.PlayerDTO;
import com.copascom.torneios.dto.TeamDTO;
import com.copascom.torneios.model.Player;
import com.copascom.torneios.model.Sport;
import com.copascom.torneios.model.Team;
import com.copascom.torneios.repository.PlayerRepository;
import com.copascom.torneios.repository.SportRepository;
import com.copascom.torneios.repository.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private SportRepository sportRepository;
    @Autowired
    private PlayerRepository playerRepository; // Adicionado para salvar o jogador

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Transactional
    public Team createTeam(TeamDTO teamDTO) {
        Team newTeam = new Team();
        newTeam.setName(teamDTO.getName());
        newTeam.setCategory(teamDTO.getCategory());
        newTeam.setCompeting(teamDTO.isCompeting());

        if (teamDTO.getSports() != null && !teamDTO.getSports().isEmpty()) {
            Set<Sport> sportsEntities = new HashSet<>(sportRepository.findAllById(teamDTO.getSports()));
            newTeam.setSports(sportsEntities);
        }
        // A lógica de criação de jogadores junto com o time foi removida para simplificar
        // e manter a responsabilidade no endpoint de adicionar jogador.

        return teamRepository.save(newTeam);
    }

    @Transactional
    public Team updateTeam(Long id, TeamDTO teamDTO) {
        Team teamToUpdate = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Time com ID " + id + " não encontrado."));

        teamToUpdate.setName(teamDTO.getName());
        teamToUpdate.setCategory(teamDTO.getCategory());
        teamToUpdate.setCompeting(teamDTO.isCompeting());

        if (teamDTO.getSports() != null) {
            Set<Sport> sportsEntities = new HashSet<>(sportRepository.findAllById(teamDTO.getSports()));
            teamToUpdate.setSports(sportsEntities);
        }

        return teamRepository.save(teamToUpdate);
    }

    public void deleteTeam(Long id) {
        if (!teamRepository.existsById(id)) {
            throw new EntityNotFoundException("Time com ID " + id + " não encontrado.");
        }
        teamRepository.deleteById(id);
    }

    /**
     * Lógica ATUALIZADA para adicionar um jogador a um time,
     * incluindo a associação com os esportes.
     */
    @Transactional
    public Player addPlayerToTeam(Long teamId, PlayerDTO playerDTO) {
        // 1. Encontra o time
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Time com ID " + teamId + " não encontrado."));

        // 2. Cria a entidade Player
        Player newPlayer = new Player();
        newPlayer.setName(playerDTO.getName());
        newPlayer.setShirtNumber(playerDTO.getShirtNumber());
        newPlayer.setTeam(team); // Associa o jogador ao time

        // 3. LÓGICA ADICIONADA: Associa os esportes ao jogador
        if (playerDTO.getSports() != null && !playerDTO.getSports().isEmpty()) {
            Set<Sport> sports = new HashSet<>(sportRepository.findAllById(playerDTO.getSports()));
            if(sports.size() != playerDTO.getSports().size()){
                throw new EntityNotFoundException("Um ou mais esportes informados não existem.");
            }
            newPlayer.setSports(sports);
        }
        
        // 4. Salva o novo jogador
        return playerRepository.save(newPlayer);
    }
}