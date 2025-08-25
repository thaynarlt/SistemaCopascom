// src/main/java/com/copascom/torneios/repository/SportRepository.java
package com.copascom.torneios.repository;

import com.copascom.torneios.model.Sport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// O segundo parâmetro genérico DEVE ser o tipo da chave primária (@Id)
public interface SportRepository extends JpaRepository<Sport, String> { // <-- CORREÇÃO AQUI
}