// src/main/java/com/copascom/torneios/repository/TeamRepository.java
package com.copascom.torneios.repository;

import com.copascom.torneios.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
}
