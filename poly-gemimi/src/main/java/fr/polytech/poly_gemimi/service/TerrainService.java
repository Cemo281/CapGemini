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
    
    @Autowired
    private fr.polytech.poly_gemimi.repository.CoordonneeRepository coordonneeRepository;

    public Terrain addTerrain(Terrain terrain) {
        // Simple logic: if coord exists (ID set), use it. If not (ID null), save it.
        // Assuming CascadeType.ALL or handling here.
        // The prompt says "revert to initial state".
        // Initial state was likely just save(terrain).
        // But to avoid TransientObjectException if coord is new:
        
        fr.polytech.poly_gemimi.entity.Coordonnee coord = terrain.getCoordonnees();
        if (coord != null && coord.getId() == null) {
             coordonneeRepository.save(coord);
        }
        
        return terrainRepository.save(terrain);
    }

    public void deleteTerrain(Long id) {
        terrainRepository.deleteById(id);
    }

    public void updateTerrain(Long id, Terrain terrain) {
        Terrain existingTerrain = terrainRepository.findById(id).orElseThrow(() -> new RuntimeException("Terrain not found"));
        existingTerrain.setNom(terrain.getNom());
        existingTerrain.setQuantite(terrain.getQuantite());
        existingTerrain.setDescription(terrain.getDescription());
        
        if (terrain.getCoordonnees() != null) {
            fr.polytech.poly_gemimi.entity.Coordonnee inputCoord = terrain.getCoordonnees();
            // Simple update: if ID provided, set it. If not, save new.
            if (inputCoord.getId() == null) {
                coordonneeRepository.save(inputCoord);
            }
            existingTerrain.setCoordonnees(inputCoord);
        }
        
        terrainRepository.save(existingTerrain);
    }


    public Terrain getTerrain(Long id) {
        return terrainRepository.findById(id).orElseThrow(() -> new RuntimeException("Terrain not found"));
    }

    public java.util.List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }
}
