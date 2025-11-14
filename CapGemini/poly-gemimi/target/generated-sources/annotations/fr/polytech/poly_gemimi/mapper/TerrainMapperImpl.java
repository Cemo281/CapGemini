package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.entity.Terrain;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-14T15:02:00+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.1 (Oracle Corporation)"
)
@Component
public class TerrainMapperImpl implements TerrainMapper {

    @Autowired
    private CoordonneeMapper coordonneeMapper;

    @Override
    public TerrainDTO toDto(Terrain terrain) {
        if ( terrain == null ) {
            return null;
        }

        TerrainDTO terrainDTO = new TerrainDTO();

        terrainDTO.setId( terrain.getId() );
        terrainDTO.setNom( terrain.getNom() );
        terrainDTO.setQuantite( terrain.getQuantite() );
        terrainDTO.setDescription( terrain.getDescription() );
        terrainDTO.setCoordonnees( coordonneeMapper.toDto( terrain.getCoordonnees() ) );

        return terrainDTO;
    }

    @Override
    public Terrain toEntity(TerrainDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Terrain terrain = new Terrain();

        terrain.setId( dto.getId() );
        terrain.setNom( dto.getNom() );
        terrain.setQuantite( dto.getQuantite() );
        terrain.setDescription( dto.getDescription() );
        terrain.setCoordonnees( coordonneeMapper.toEntity( dto.getCoordonnees() ) );

        return terrain;
    }
}
