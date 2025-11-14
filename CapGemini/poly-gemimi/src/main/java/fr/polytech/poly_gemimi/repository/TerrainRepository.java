package fr.polytech.poly_gemimi.repository;

import fr.polytech.poly_gemimi.entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Long> {

}
