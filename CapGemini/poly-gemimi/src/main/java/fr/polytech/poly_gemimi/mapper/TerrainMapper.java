package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.entity.Terrain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.mapstruct.Mapper;

@Mapper(componentModel= "spring",uses=CoordonneeMapper.class)
public interface TerrainMapper {

    TerrainDTO toDto(Terrain terrain);

    Terrain toEntity(TerrainDTO dto);
}
