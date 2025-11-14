package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.entity.Terrain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TerrainMapper {

    @Autowired
    private CoordonneeMapper coordonneeMapper;

    public TerrainDTO toDTO(Terrain terrain) {
        TerrainDTO dto = new TerrainDTO();
        dto.setId(terrain.getId());
        dto.setNom(terrain.getNom());
        dto.setQuantite(terrain.getQuantite());
        dto.setDescription(terrain.getDescription());
        dto.setCoordonnees(coordonneeMapper.toDTO(terrain.getCoordonnees()));
        return dto;
    }

    public Terrain toEntity(TerrainDTO dto) {
        Terrain entity = new Terrain();
        entity.setId(dto.getId());
        entity.setNom(dto.getNom());
        entity.setQuantite(dto.getQuantite());
        entity.setDescription(dto.getDescription());
        entity.setCoordonnees(coordonneeMapper.toEntity(dto.getCoordonnees()));
        return entity;
    }
}
