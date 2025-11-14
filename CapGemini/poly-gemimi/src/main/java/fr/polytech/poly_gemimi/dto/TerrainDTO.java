package fr.polytech.poly_gemimi.dto;


import fr.polytech.poly_gemimi.entity.Coordonnee;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TerrainDTO {
    private Long id;
    private String nom;
    private int quantite;
    private String description;
    private CoordonneeDTO coordonnees;
}