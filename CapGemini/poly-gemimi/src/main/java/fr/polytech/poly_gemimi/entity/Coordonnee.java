
package fr.polytech.poly_gemimi.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "coordonnee")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordonnee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String longitude;

    @Column(nullable = false)
    private String latitude;
}
