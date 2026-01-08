package fr.polytech.poly_gemimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.repository.CoordonneeRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CoordonneeService {

    @Autowired
    private CoordonneeRepository coordonneeRepository;
    public Coordonnee addCoordonnee(Coordonnee coordonnee) {
        // Validate presence
        if (coordonnee.getLatitude() == null || coordonnee.getLatitude().isBlank()) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Latitude is required");
        }
        if (coordonnee.getLongitude() == null || coordonnee.getLongitude().isBlank()) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Longitude is required");
        }
        // Validate numeric ranges
        validateCoordinates(coordonnee.getLatitude(), coordonnee.getLongitude());
        return coordonneeRepository.save(coordonnee);
    }

    public void deleteCoordonnee(Long id) {
        coordonneeRepository.deleteById(id);
    }

    public void updateCoordonnee(Long id, Coordonnee coordonnee) {
        Coordonnee existingCoordonnee = coordonneeRepository.findById(id).orElseThrow(() -> new fr.polytech.poly_gemimi.exception.ResourceNotFoundException("Coordonnee not found"));
        if (coordonnee.getLatitude() == null || coordonnee.getLatitude().isBlank()) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Latitude is required");
        }
        if (coordonnee.getLongitude() == null || coordonnee.getLongitude().isBlank()) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Longitude is required");
        }
        // Validate ranges
        validateCoordinates(coordonnee.getLatitude(), coordonnee.getLongitude());
        existingCoordonnee.setLatitude(coordonnee.getLatitude());
        existingCoordonnee.setLongitude(coordonnee.getLongitude());
        coordonneeRepository.save(existingCoordonnee);
    }

    public Coordonnee getCoordonnee(Long id) {
        return coordonneeRepository.findById(id).orElseThrow(() -> new fr.polytech.poly_gemimi.exception.ResourceNotFoundException("Coordonnee not found"));
    }

    public java.util.List<Coordonnee> getAllCoordonnees() {
        return coordonneeRepository.findAll();
    }

    private void validateCoordinates(String latStr, String lonStr) {
        try {
            double lat = Double.parseDouble(latStr.trim());
            double lon = Double.parseDouble(lonStr.trim());
            if (lat < -90.0 || lat > 90.0) {
                throw new fr.polytech.poly_gemimi.exception.BadRequestException("Latitude must be between -90 and 90");
            }
            if (lon < -180.0 || lon > 180.0) {
                throw new fr.polytech.poly_gemimi.exception.BadRequestException("Longitude must be between -180 and 180");
            }
        } catch (NumberFormatException e) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Latitude and longitude must be numeric");
        }
    }
}
