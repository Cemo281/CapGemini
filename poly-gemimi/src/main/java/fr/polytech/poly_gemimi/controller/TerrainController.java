package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.mapper.CoordonneeMapper;
import fr.polytech.poly_gemimi.mapper.TerrainMapper;
import fr.polytech.poly_gemimi.service.CoordonneeService;
import fr.polytech.poly_gemimi.service.TerrainService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/terrains")
@CrossOrigin(origins = "http://localhost:4200")
public class TerrainController {

    private final TerrainMapper terrainMapper;
    private final TerrainService terrainService;
    private final CoordonneeService coordonneeService;
    private final CoordonneeMapper coordonneeMapper;

    public TerrainController( TerrainMapper terrainMapper, TerrainService terrainService, CoordonneeService coordonneeService, CoordonneeMapper coordonneeMapper) {
        this.coordonneeMapper = coordonneeMapper;
        this.terrainMapper = terrainMapper;
        this.terrainService = terrainService;
        this.coordonneeService = coordonneeService;}

    @PostMapping
    public ResponseEntity<Terrain> createTerrain(@RequestBody TerrainDTO dto) {
        CoordonneeDTO coordDto = dto.getCoordonnees();
        Coordonnee coord = coordonneeMapper.toEntity(coordDto);
        Coordonnee savedCoord = coordonneeService.addCoordonnee(coord);

        Terrain terrain=terrainMapper.toEntity(dto);
        terrain.setCoordonnees(savedCoord);
        Terrain saved = terrainService.addTerrain(terrain);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

}