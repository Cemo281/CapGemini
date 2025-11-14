package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.service.CoordonneeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordonnees")
public class CoordonneeController {

    private final CoordonneeService coordonneeService;

    public CoordonneeController(CoordonneeService coordonneeService) {
        this.coordonneeService = coordonneeService;
    }

    // Création d'une coordonnée
    @PostMapping("/add")
    public ResponseEntity<Coordonnee> createCoordonnee(@RequestBody CoordonneeDTO dto){
        Coordonnee coordonnee = new Coordonnee();
        coordonnee.setLatitude(dto.getLatitude());  // si ta colonne est String, sinon dto.getLatitudeDouble()
        coordonnee.setLongitude(dto.getLongitude());

        Coordonnee saved = coordonneeService.addCoordonnee(coordonnee);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Récupérer toutes les coordonnées
    @GetMapping
    public List<Coordonnee> getAllCoordonnees() {
        return coordonneeService.getAllCoordonnees();
    }
}

