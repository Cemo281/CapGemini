package fr.polytech.poly_gemimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.repository.UtilisateurRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UtilisateurService {
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur addUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public void updateUtilisateur(Long id, Utilisateur utilisateur) {
        Utilisateur existingUtilisateur = utilisateurRepository.findById(id).orElseThrow(() -> new fr.polytech.poly_gemimi.exception.ResourceNotFoundException("Utilisateur not found"));
        existingUtilisateur.setNom(utilisateur.getNom());
        existingUtilisateur.setPrenom(utilisateur.getPrenom());
        existingUtilisateur.setMail(utilisateur.getMail());
        existingUtilisateur.setUsername(utilisateur.getUsername());
        // Update role if provided
        if (utilisateur.getRole() != null) {
            existingUtilisateur.setRole(utilisateur.getRole());
        }
        // Update password only if a new one was provided
        if (utilisateur.getPassword() != null && !utilisateur.getPassword().isEmpty()) {
            existingUtilisateur.setPassword(utilisateur.getPassword());
        }
        utilisateurRepository.save(existingUtilisateur);
    }

    public Utilisateur getUtilisateur(Long id) {
        return utilisateurRepository.findById(id).orElseThrow(() -> new fr.polytech.poly_gemimi.exception.ResourceNotFoundException("Utilisateur not found"));
    }

    public java.util.List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }
    
}
