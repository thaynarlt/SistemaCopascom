package com.copascom.torneios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.copascom.torneios.model.Sport;

public interface SportRepository extends JpaRepository<Sport, Long>{
    
}
