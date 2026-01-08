package fr.polytech.poly_gemimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.repository.CoordonneeRepository;
import fr.polytech.poly_gemimi.exception.ResourceNotFoundException;
import fr.polytech.poly_gemimi.exception.InvalidDataException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CoordonneeService {

    @Autowired
    private CoordonneeRepository coordonneeRepository;

    public Coordonnee addCoordonnee(Coordonnee coordonnee) {
        // Valider les données avant d'ajouter
        try {
            if (coordonnee.getLatitude() == null || coordonnee.getLatitude().trim().isEmpty()) {
                throw new InvalidDataException("La latitude ne peut pas être vide");
            }
            if (coordonnee.getLongitude() == null || coordonnee.getLongitude().trim().isEmpty()) {
                throw new InvalidDataException("La longitude ne peut pas être vide");
            }
            
            double lat = Double.parseDouble(coordonnee.getLatitude());
            double lon = Double.parseDouble(coordonnee.getLongitude());
            
            if (lat < -90 || lat > 90) {
                throw new InvalidDataException("La latitude doit être entre -90 et 90");
            }
            if (lon < -180 || lon > 180) {
                throw new InvalidDataException("La longitude doit être entre -180 et 180");
            }
        } catch (NumberFormatException e) {
            throw new InvalidDataException("La latitude et longitude doivent être des nombres valides");
        }
        
        return coordonneeRepository.save(coordonnee);
    }

    public void deleteCoordonnee(Long id) {
        coordonneeRepository.deleteById(id);
    }

    public void updateCoordonnee(Long id, Coordonnee coordonnee) {
        Coordonnee existingCoordonnee = coordonneeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coordonnée avec l'ID " + id + " n'existe pas"));
        
        // Valider les données avant de mettre à jour
        try {
            if (coordonnee.getLatitude() != null && !coordonnee.getLatitude().trim().isEmpty()) {
                double lat = Double.parseDouble(coordonnee.getLatitude());
                if (lat < -90 || lat > 90) {
                    throw new InvalidDataException("La latitude doit être entre -90 et 90");
                }
            }
            if (coordonnee.getLongitude() != null && !coordonnee.getLongitude().trim().isEmpty()) {
                double lon = Double.parseDouble(coordonnee.getLongitude());
                if (lon < -180 || lon > 180) {
                    throw new InvalidDataException("La longitude doit être entre -180 et 180");
                }
            }
        } catch (NumberFormatException e) {
            throw new InvalidDataException("La latitude et longitude doivent être des nombres valides");
        }
        
        existingCoordonnee.setLatitude(coordonnee.getLatitude());
        existingCoordonnee.setLongitude(coordonnee.getLongitude());
        coordonneeRepository.save(existingCoordonnee);
    }

    public Coordonnee getCoordonnee(Long id) {
        return coordonneeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coordonnée avec l'ID " + id + " n'existe pas"));
    }

    public java.util.List<Coordonnee> getAllCoordonnees() {
        return coordonneeRepository.findAll();
    }
}
