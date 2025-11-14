package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-14T14:55:49+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.1 (Oracle Corporation)"
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
        coordonneeDTO.setLongitude( Entity.getLongitude() );
        coordonneeDTO.setLatitude( Entity.getLatitude() );

        return coordonneeDTO;
    }

    @Override
    public Coordonnee toEntity(CoordonneeDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Coordonnee coordonnee = new Coordonnee();

        coordonnee.setId( dto.getId() );
        coordonnee.setLongitude( dto.getLongitude() );
        coordonnee.setLatitude( dto.getLatitude() );

        return coordonnee;
    }
}
