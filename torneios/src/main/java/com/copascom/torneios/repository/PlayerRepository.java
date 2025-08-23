package com.copascom.torneios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.copascom.torneios.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Long>{
    
}
