package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import org.springframework.stereotype.Component;
import org.mapstruct.Mapper;

@Mapper(componentModel ="spring")
public interface CoordonneeMapper {

    CoordonneeDTO toDto(Coordonnee Entity);

    Coordonnee toEntity(CoordonneeDTO dto);
}
