package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.entity.Terrain;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-07T20:40:46+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
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

        terrainDTO.setCoordonnees( coordonneeMapper.toDto( terrain.getCoordonnees() ) );
        terrainDTO.setDescription( terrain.getDescription() );
        terrainDTO.setId( terrain.getId() );
        terrainDTO.setNom( terrain.getNom() );
        terrainDTO.setQuantite( terrain.getQuantite() );

        return terrainDTO;
    }

    @Override
    public Terrain toEntity(TerrainDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Terrain terrain = new Terrain();

        terrain.setCoordonnees( coordonneeMapper.toEntity( dto.getCoordonnees() ) );
        terrain.setDescription( dto.getDescription() );
        terrain.setId( dto.getId() );
        terrain.setNom( dto.getNom() );
        terrain.setQuantite( dto.getQuantite() );

        return terrain;
    }
}
