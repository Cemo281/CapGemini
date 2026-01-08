package fr.polytech.poly_gemimi.repository;

import fr.polytech.poly_gemimi.entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Long> {
    
    @Query("SELECT COUNT(t) > 0 FROM Terrain t WHERE t.coordonnees.id = :coordId")
    boolean isCoordonneeLinkedToAnyTerrain(@Param("coordId") Long coordId);

    boolean existsByCoordonneesId(Long coordonneesId);
}
