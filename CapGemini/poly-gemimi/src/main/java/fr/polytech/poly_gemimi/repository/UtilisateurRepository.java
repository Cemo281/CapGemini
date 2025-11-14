package fr.polytech.poly_gemimi.repository;

import org.springframework.stereotype.Repository;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

}
