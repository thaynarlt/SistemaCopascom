package com.copascom.torneios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.copascom.torneios.model.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Long>{
    
}
