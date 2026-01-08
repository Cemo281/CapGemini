package fr.polytech.poly_gemimi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.repository.UtilisateurRepository;
import fr.polytech.poly_gemimi.exception.ResourceNotFoundException;
import fr.polytech.poly_gemimi.exception.InvalidDataException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UtilisateurService {
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur addUtilisateur(Utilisateur utilisateur) {
        // Valider les données avant d'ajouter
        if (utilisateur.getUsername() == null || utilisateur.getUsername().trim().isEmpty()) {
            throw new InvalidDataException("Le username ne peut pas être vide");
        }
        if (utilisateur.getMail() == null || utilisateur.getMail().trim().isEmpty()) {
            throw new InvalidDataException("L'email ne peut pas être vide");
        }
        if (utilisateur.getPassword() == null || utilisateur.getPassword().trim().isEmpty()) {
            throw new InvalidDataException("Le password ne peut pas être vide");
        }
        
        return utilisateurRepository.save(utilisateur);
    }

    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public void updateUtilisateur(Long id, Utilisateur utilisateur) {
        Utilisateur existingUtilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur avec l'ID " + id + " n'existe pas"));
        
        // Valider les données avant de mettre à jour
        if (utilisateur.getUsername() != null && utilisateur.getUsername().trim().isEmpty()) {
            throw new InvalidDataException("Le username ne peut pas être vide");
        }
        if (utilisateur.getMail() != null && utilisateur.getMail().trim().isEmpty()) {
            throw new InvalidDataException("L'email ne peut pas être vide");
        }
        
        existingUtilisateur.setNom(utilisateur.getNom());
        existingUtilisateur.setPrenom(utilisateur.getPrenom());
        existingUtilisateur.setMail(utilisateur.getMail());
        existingUtilisateur.setUsername(utilisateur.getUsername());
        existingUtilisateur.setRole(utilisateur.getRole());
        
        if (utilisateur.getPassword() != null && !utilisateur.getPassword().isEmpty()) {
            existingUtilisateur.setPassword(utilisateur.getPassword());
        }
        
        utilisateurRepository.save(existingUtilisateur);
    }

    public Utilisateur getUtilisateur(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur avec l'ID " + id + " n'existe pas"));
    }

    public java.util.List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }
    
}
