package fr.polytech.poly_gemimi.dto;

import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String mail;
    private String password;
    private String username;
    private Set<TerrainDTO> terrains;
    private String role;
}
