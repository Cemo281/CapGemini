package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.service.CoordonneeService;
import fr.polytech.poly_gemimi.service.TerrainService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/terrains")
public class TerrainController {

    private final TerrainService terrainService;

    public TerrainController(TerrainService terrainService) {
        this.terrainService = terrainService;
    }

    @GetMapping("/add")
    public Terrain createTerrain(@RequestParam String nom,@RequestParam int quantite,@RequestParam String description){
        Terrain terrain = new Terrain();
        terrain.setNom(nom);
        terrain.setQuantite(quantite);
        terrain.setDescription(description);
        Coordonnee coordonnee = new Coordonnee();
        coordonnee.setLongitude(0.47F);
        coordonnee.setLatitude(0.48F);
        terrain.setCoordonnees(coordonnee);
        return(terrainService.addTerrain(terrain));

    }
}