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
@CrossOrigin(origins = "http://localhost:4200")
public class CoordonneeController {

    private final CoordonneeService coordonneeService;
    private final CoordonneeMapper coordonneeMapper;

    public CoordonneeController(CoordonneeService coordonneeService, CoordonneeMapper coordonneeMapper) {
        this.coordonneeService = coordonneeService;
        this.coordonneeMapper = coordonneeMapper;
    }

    // Création d'une coordonnée
    @PostMapping
    public ResponseEntity<CoordonneeDTO> createCoordonnee(@RequestBody CoordonneeDTO dto){
        Coordonnee coordonnee=coordonneeMapper.toEntity(dto);

        Coordonnee saved = coordonneeService.addCoordonnee(coordonnee);
        return ResponseEntity.status(HttpStatus.CREATED).body(coordonneeMapper.toDto(saved));
    }

    // Récupérer toutes les coordonnées
    @GetMapping
    public ResponseEntity<List<CoordonneeDTO>> getAllCoordonnees() {
        List<Coordonnee> coordonnees = coordonneeService.getAllCoordonnees();
        List<CoordonneeDTO> coordonneeDTOs = coordonnees.stream()
                .map(coordonneeMapper::toDto)
                .toList();
        return ResponseEntity.ok(coordonneeDTOs);
    }

    // Récupérer une coordonnée par ID
    @GetMapping("/{id}")
    public ResponseEntity<CoordonneeDTO> getCoordonnee(@PathVariable Long id) {
        Coordonnee coordonnee = coordonneeService.getCoordonnee(id);
        return ResponseEntity.ok(coordonneeMapper.toDto(coordonnee));
    }

    // Supprimer une coordonnée
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoordonnee(@PathVariable Long id) {
        coordonneeService.deleteCoordonnee(id);
        return ResponseEntity.noContent().build();
    }

    // Mettre à jour une coordonnée
    @PutMapping("/{id}")
    public ResponseEntity<CoordonneeDTO> updateCoordonnee(@PathVariable Long id, @RequestBody CoordonneeDTO dto) {
        Coordonnee coordonnee = coordonneeMapper.toEntity(dto);
        coordonneeService.updateCoordonnee(id, coordonnee);
        Coordonnee updated = coordonneeService.getCoordonnee(id);
        return ResponseEntity.ok(coordonneeMapper.toDto(updated));
    }
}

