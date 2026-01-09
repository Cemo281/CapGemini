package fr.polytech.poly_gemimi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private UtilisateurDTO utilisateur;
    private Set<TerrainDTO> terrains;
    private String commentaire;
}
