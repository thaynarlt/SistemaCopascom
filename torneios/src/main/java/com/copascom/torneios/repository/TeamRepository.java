package com.copascom.torneios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.copascom.torneios.model.Team;

public interface TeamRepository extends JpaRepository<Team, Long>{
    
}
