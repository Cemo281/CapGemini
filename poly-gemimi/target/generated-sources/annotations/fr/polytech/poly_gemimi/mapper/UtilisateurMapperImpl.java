package fr.polytech.poly_gemimi.mapper;

import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.dto.UtilisateurDTO;
import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-07T20:40:46+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class UtilisateurMapperImpl implements UtilisateurMapper {

    @Autowired
    private TerrainMapper terrainMapper;

    @Override
    public UtilisateurDTO toDto(Utilisateur utilisateur) {
        if ( utilisateur == null ) {
            return null;
        }

        UtilisateurDTO utilisateurDTO = new UtilisateurDTO();

        utilisateurDTO.setId( utilisateur.getId() );
        utilisateurDTO.setMail( utilisateur.getMail() );
        utilisateurDTO.setNom( utilisateur.getNom() );
        utilisateurDTO.setPassword( utilisateur.getPassword() );
        utilisateurDTO.setPrenom( utilisateur.getPrenom() );
        utilisateurDTO.setRole( utilisateur.getRole() );
        utilisateurDTO.setTerrains( terrainSetToTerrainDTOSet( utilisateur.getTerrains() ) );
        utilisateurDTO.setUsername( utilisateur.getUsername() );

        return utilisateurDTO;
    }

    @Override
    public Utilisateur toEntity(UtilisateurDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setId( dto.getId() );
        utilisateur.setMail( dto.getMail() );
        utilisateur.setNom( dto.getNom() );
        utilisateur.setPassword( dto.getPassword() );
        utilisateur.setPrenom( dto.getPrenom() );
        utilisateur.setRole( dto.getRole() );
        utilisateur.setTerrains( terrainDTOSetToTerrainSet( dto.getTerrains() ) );
        utilisateur.setUsername( dto.getUsername() );

        return utilisateur;
    }

    protected Set<TerrainDTO> terrainSetToTerrainDTOSet(Set<Terrain> set) {
        if ( set == null ) {
            return null;
        }

        Set<TerrainDTO> set1 = new LinkedHashSet<TerrainDTO>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Terrain terrain : set ) {
            set1.add( terrainMapper.toDto( terrain ) );
        }

        return set1;
    }

    protected Set<Terrain> terrainDTOSetToTerrainSet(Set<TerrainDTO> set) {
        if ( set == null ) {
            return null;
        }

        Set<Terrain> set1 = new LinkedHashSet<Terrain>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( TerrainDTO terrainDTO : set ) {
            set1.add( terrainMapper.toEntity( terrainDTO ) );
        }

        return set1;
    }
}
