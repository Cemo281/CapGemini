package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import org.springframework.stereotype.Component;

@Component
public class CoordonneeMapper {

    public CoordonneeDTO toDTO(Coordonnee coordonnee){
        CoordonneeDTO coordonneeDTO = new CoordonneeDTO();
        coordonneeDTO.setId(coordonnee.getId());
        coordonneeDTO.setLatitude(coordonnee.getLatitude());
        coordonneeDTO.setLongitude(coordonnee.getLongitude());
        return coordonneeDTO;
    }

    public Coordonnee toEntity(CoordonneeDTO coordonneeDTO){
        Coordonnee coordonnee = new Coordonnee();
        coordonnee.setId(coordonneeDTO.getId());
        coordonnee.setLatitude(coordonneeDTO.getLatitude());
        coordonnee.setLongitude(coordonneeDTO.getLongitude());
        return coordonnee;
    }
}
