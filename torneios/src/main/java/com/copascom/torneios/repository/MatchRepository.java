package com.copascom.torneios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.copascom.torneios.model.Match;

public interface MatchRepository extends JpaRepository<Match, Long>{
    
}
