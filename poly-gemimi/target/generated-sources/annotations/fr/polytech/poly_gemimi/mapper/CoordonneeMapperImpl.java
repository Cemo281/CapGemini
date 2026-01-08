package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-07T20:40:46+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class CoordonneeMapperImpl implements CoordonneeMapper {

    @Override
    public CoordonneeDTO toDto(Coordonnee Entity) {
        if ( Entity == null ) {
            return null;
        }

        CoordonneeDTO coordonneeDTO = new CoordonneeDTO();

        coordonneeDTO.setId( Entity.getId() );
        coordonneeDTO.setLatitude( Entity.getLatitude() );
        coordonneeDTO.setLongitude( Entity.getLongitude() );

        return coordonneeDTO;
    }

    @Override
    public Coordonnee toEntity(CoordonneeDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Coordonnee coordonnee = new Coordonnee();

        coordonnee.setId( dto.getId() );
        coordonnee.setLatitude( dto.getLatitude() );
        coordonnee.setLongitude( dto.getLongitude() );

        return coordonnee;
    }
}
