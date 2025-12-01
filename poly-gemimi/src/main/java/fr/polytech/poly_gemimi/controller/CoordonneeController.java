package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.mapper.CoordonneeMapper;
import fr.polytech.poly_gemimi.service.CoordonneeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordonnees")
public class CoordonneeController {

    private final CoordonneeService coordonneeService;
    private final CoordonneeMapper coordonneeMapper;

    public CoordonneeController(CoordonneeService coordonneeService, CoordonneeMapper coordonneeMapper) {
        this.coordonneeService = coordonneeService;
        this.coordonneeMapper = coordonneeMapper;
    }

    // Création d'une coordonnée
    @PostMapping
    public ResponseEntity<Coordonnee> createCoordonnee(@RequestBody CoordonneeDTO dto){
        Coordonnee coordonnee=coordonneeMapper.toEntity(dto);

        Coordonnee saved = coordonneeService.addCoordonnee(coordonnee);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Récupérer toutes les coordonnées
    @GetMapping
    public List<Coordonnee> getAllCoordonnees() {
        return coordonneeService.getAllCoordonnees();
    }
}

