package fr.polytech.poly_gemimi.repository;

import fr.polytech.poly_gemimi.entity.Coordonnee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordonneeRepository extends JpaRepository<Coordonnee, Long> {

}
