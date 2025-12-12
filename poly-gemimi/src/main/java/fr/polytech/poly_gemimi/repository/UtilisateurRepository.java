package fr.polytech.poly_gemimi.repository;

import org.springframework.stereotype.Repository;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByUsername(String username);
}
