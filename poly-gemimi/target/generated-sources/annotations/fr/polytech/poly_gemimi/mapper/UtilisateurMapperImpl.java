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
    date = "2025-11-14T16:22:51+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.1 (Oracle Corporation)"
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
        utilisateurDTO.setNom( utilisateur.getNom() );
        utilisateurDTO.setPrenom( utilisateur.getPrenom() );
        utilisateurDTO.setMail( utilisateur.getMail() );
        utilisateurDTO.setPassword( utilisateur.getPassword() );
        utilisateurDTO.setUsername( utilisateur.getUsername() );
        utilisateurDTO.setTerrains( terrainSetToTerrainDTOSet( utilisateur.getTerrains() ) );

        return utilisateurDTO;
    }

    @Override
    public Utilisateur toEntity(UtilisateurDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setId( dto.getId() );
        utilisateur.setNom( dto.getNom() );
        utilisateur.setPrenom( dto.getPrenom() );
        utilisateur.setMail( dto.getMail() );
        utilisateur.setPassword( dto.getPassword() );
        utilisateur.setUsername( dto.getUsername() );
        utilisateur.setTerrains( terrainDTOSetToTerrainSet( dto.getTerrains() ) );

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
