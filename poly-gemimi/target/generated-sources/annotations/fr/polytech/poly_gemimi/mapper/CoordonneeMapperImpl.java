package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-14T16:22:51+0100",
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
        if ( Entity.getLongitude() != null ) {
            coordonneeDTO.setLongitude( String.valueOf( Entity.getLongitude() ) );
        }
        if ( Entity.getLatitude() != null ) {
            coordonneeDTO.setLatitude( String.valueOf( Entity.getLatitude() ) );
        }

        return coordonneeDTO;
    }

    @Override
    public Coordonnee toEntity(CoordonneeDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Coordonnee coordonnee = new Coordonnee();

        coordonnee.setId( dto.getId() );
        if ( dto.getLongitude() != null ) {
            coordonnee.setLongitude( Float.parseFloat( dto.getLongitude() ) );
        }
        if ( dto.getLatitude() != null ) {
            coordonnee.setLatitude( Float.parseFloat( dto.getLatitude() ) );
        }

        return coordonnee;
    }
}
