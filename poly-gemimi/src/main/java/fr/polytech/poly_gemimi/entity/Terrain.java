package fr.polytech.poly_gemimi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "terrain")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Terrain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private int quantite;

    @Column(nullable = true)
    private String description;

    @ManyToOne
    @JoinColumn(name = "coordonnees_id", nullable = false)
    private Coordonnee coordonnees;
}
