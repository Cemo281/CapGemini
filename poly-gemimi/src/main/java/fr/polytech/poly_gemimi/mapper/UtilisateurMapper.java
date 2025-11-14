package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.UtilisateurDTO;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UtilisateurMapper {

    @Autowired
    private TerrainMapper terrainMapper;

    public UtilisateurDTO toDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto= new  UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setMail(utilisateur.getMail());
        dto.setPassword(utilisateur.getPassword());
        dto.setUsername(utilisateur.getUsername());
        if(utilisateur.getTerrains()!=null){
            dto.setTerrains(utilisateur.getTerrains().stream().map(terrainMapper::toDTO).collect(Collectors.toSet()));
        }
        return(dto);
    }

    public  Utilisateur toEntity(UtilisateurDTO dto) {
        Utilisateur entity = new  Utilisateur();
        entity.setId(dto.getId());
        entity.setNom(dto.getNom());
        entity.setPrenom(dto.getPrenom());
        entity.setMail(dto.getMail());
        entity.setPassword(dto.getPassword());
        entity.setUsername(dto.getUsername());
        if(dto.getTerrains()!=null){
            entity.setTerrains(dto.getTerrains().stream().map(terrainMapper::toEntity).collect(Collectors.toSet()));
        }
        return(entity);
    }
}
