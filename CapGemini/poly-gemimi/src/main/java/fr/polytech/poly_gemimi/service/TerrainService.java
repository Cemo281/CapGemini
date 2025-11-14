package fr.polytech.poly_gemimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.repository.TerrainRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class TerrainService {

    @Autowired
    private TerrainRepository terrainRepository;

    public Terrain addTerrain(Terrain terrain) {
        return terrainRepository.save(terrain);
    }

    public void deleteTerrain(Long id) {
        terrainRepository.deleteById(id);
    }

    public void updateTerrain(Long id, Terrain terrain) {
        Terrain existingTerrain = terrainRepository.findById(id).orElseThrow(() -> new RuntimeException("Terrain not found"));
        existingTerrain.setNom(terrain.getNom());
        existingTerrain.setQuantite(terrain.getQuantite());
        terrainRepository.save(existingTerrain);
    }

    public Terrain getTerrain(Long id) {
        return terrainRepository.findById(id).orElseThrow(() -> new RuntimeException("Terrain not found"));
    }

    public java.util.List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }
}
