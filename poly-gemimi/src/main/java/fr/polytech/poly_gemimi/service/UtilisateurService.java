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
        // Validate role if provided
        if (utilisateur.getRole() != null) {
            utilisateur.setRole(validateRole(utilisateur.getRole()));
        }
        // Validate email
        if (utilisateur.getMail() == null || utilisateur.getMail().isBlank()) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Email is required");
        }
        utilisateur.setMail(validateEmail(utilisateur.getMail()));
        // Validate password on creation
        if (utilisateur.getPassword() == null || utilisateur.getPassword().isBlank()) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Password is required");
        }
        validatePassword(utilisateur.getPassword());
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
            existingUtilisateur.setRole(validateRole(utilisateur.getRole()));
        }
        // Update password only if a new one was provided
        if (utilisateur.getPassword() != null && !utilisateur.getPassword().isEmpty()) {
            validatePassword(utilisateur.getPassword());
            existingUtilisateur.setPassword(utilisateur.getPassword());
        }
        // Validate email if provided
        if (utilisateur.getMail() != null && !utilisateur.getMail().isBlank()) {
            existingUtilisateur.setMail(validateEmail(utilisateur.getMail()));
        }
        utilisateurRepository.save(existingUtilisateur);
    }

    // Ensure role is either USER or ADMIN (case-insensitive). Throws 400 Bad Request otherwise.
    private String validateRole(String role) {
        if (role == null) return null;
        String r = role.trim().toUpperCase();
        if ("USER".equals(r) || "ADMIN".equals(r)) {
            return r;
        }
        throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid role: must be USER or ADMIN");
    }

    private String validateEmail(String email) {
        if (email == null) return null;
        String e = email.trim().toLowerCase();
        // Simple email pattern
        if (!e.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Invalid email address");
        }
        return e;
    }

    private void validatePassword(String password) {
        if (password == null) return;
        if (password.length() < 8) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Password must be at least 8 characters long");
        }
        if (!password.matches(".*[A-Za-z].*")) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Password must contain at least one letter");
        }
        if (!password.matches(".*\\d.*")) {
            throw new fr.polytech.poly_gemimi.exception.BadRequestException("Password must contain at least one digit");
        }
    }

    public Utilisateur getUtilisateur(Long id) {
        return utilisateurRepository.findById(id).orElseThrow(() -> new fr.polytech.poly_gemimi.exception.ResourceNotFoundException("Utilisateur not found"));
    }

    public java.util.List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }
    
}
