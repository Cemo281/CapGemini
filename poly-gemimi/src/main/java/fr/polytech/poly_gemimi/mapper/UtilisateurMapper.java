package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.UtilisateurDTO;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel="spring",uses=TerrainMapper.class)
public interface UtilisateurMapper {

    UtilisateurDTO toDto(Utilisateur utilisateur);

    Utilisateur toEntity(UtilisateurDTO dto);
}
