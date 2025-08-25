// src/main/java/com/copascom/torneios/repository/PlayerRepository.java
package com.copascom.torneios.repository;

import com.copascom.torneios.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
}