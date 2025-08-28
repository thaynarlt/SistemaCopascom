// src/main/java/com/copascom/torneios/controller/SportController.java
package com.copascom.torneios.controller;

import com.copascom.torneios.model.Sport;
import com.copascom.torneios.repository.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

//Para que o front-end possa buscar a lista de esportes, precisamos de um Controller para isso.
@RestController
@RequestMapping("/api/sports")
@CrossOrigin(origins = "http://localhost:5173")
public class SportController {

    @Autowired
    private SportRepository sportRepository;

    @GetMapping
    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }
}