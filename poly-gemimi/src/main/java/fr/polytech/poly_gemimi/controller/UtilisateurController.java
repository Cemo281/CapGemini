package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.service.CoordonneeService;
import fr.polytech.poly_gemimi.service.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @GetMapping("/add")
    public Utilisateur createUser(@RequestParam String nom,@RequestParam String prenom,@RequestParam String mail,@RequestParam String password,@RequestParam String username){
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(nom);
        utilisateur.setPrenom(prenom);
        utilisateur.setMail(mail);
        utilisateur.setPassword(password);
        utilisateur.setUsername(username);
        return(utilisateurService.addUtilisateur(utilisateur));

    }
}