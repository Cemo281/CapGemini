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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TerrainDTO> createTerrain(@RequestBody TerrainDTO dto) {
        CoordonneeDTO coordDto = dto.getCoordonnees();
        Coordonnee coord = coordonneeMapper.toEntity(coordDto);
        Coordonnee savedCoord = coordonneeService.addCoordonnee(coord);

        Terrain terrain=terrainMapper.toEntity(dto);
        terrain.setCoordonnees(savedCoord);
        Terrain saved = terrainService.addTerrain(terrain);
        return ResponseEntity.status(HttpStatus.CREATED).body(terrainMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<TerrainDTO>> getAllTerrains() {
        List<Terrain> terrains = terrainService.getAllTerrains();
        List<TerrainDTO> terrainDTOs = terrains.stream()
                .map(terrainMapper::toDto)
                .toList();
        return ResponseEntity.ok(terrainDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TerrainDTO> getTerrain(@PathVariable Long id) {
        Terrain terrain = terrainService.getTerrain(id);
        return ResponseEntity.ok(terrainMapper.toDto(terrain));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTerrain(@PathVariable Long id) {
        terrainService.deleteTerrain(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TerrainDTO> updateTerrain(@PathVariable Long id, @RequestBody TerrainDTO dto) {
        Terrain terrain = terrainMapper.toEntity(dto);
        terrainService.updateTerrain(id, terrain);
        Terrain updated = terrainService.getTerrain(id);
        return ResponseEntity.ok(terrainMapper.toDto(updated));
    }

}