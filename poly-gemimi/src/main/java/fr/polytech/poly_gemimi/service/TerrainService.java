package fr.polytech.poly_gemimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.repository.TerrainRepository;
import fr.polytech.poly_gemimi.exception.ResourceNotFoundException;
import fr.polytech.poly_gemimi.exception.InvalidDataException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class TerrainService {

    @Autowired
    private TerrainRepository terrainRepository;
    
    @Autowired
    private fr.polytech.poly_gemimi.repository.CoordonneeRepository coordonneeRepository;

    public Terrain addTerrain(Terrain terrain) {
        // Valider les données avant d'ajouter
        if (terrain.getNom() == null || terrain.getNom().trim().isEmpty()) {
            throw new InvalidDataException("Le nom du terrain ne peut pas être vide");
        }
        if (terrain.getQuantite() <= 0) {
            throw new InvalidDataException("La quantité du terrain doit être positive");
        }
        if (terrain.getCoordonnees() == null || terrain.getCoordonnees().getId() == null) {
            throw new InvalidDataException("Les coordonnées du terrain doivent exister");
        }
        
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
        Terrain existingTerrain = terrainRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Terrain avec l'ID " + id + " n'existe pas"));
        
        // Valider les données avant de mettre à jour
        if (terrain.getNom() != null && terrain.getNom().trim().isEmpty()) {
            throw new InvalidDataException("Le nom du terrain ne peut pas être vide");
        }
        
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
        return terrainRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Terrain avec l'ID " + id + " n'existe pas"));
    }

    public java.util.List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }
}
