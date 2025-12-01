package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.UtilisateurDTO;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.mapper.UtilisateurMapper;
import fr.polytech.poly_gemimi.service.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    private final UtilisateurMapper utilisateurMapper;

    public UtilisateurController(UtilisateurService utilisateurService, UtilisateurMapper utilisateurMapper) {
        this.utilisateurService = utilisateurService;
        this.utilisateurMapper = utilisateurMapper;
    }

    @PostMapping
    public ResponseEntity<Utilisateur> createUser(@RequestBody UtilisateurDTO dto){
        Utilisateur user = utilisateurMapper.toEntity(dto);
        Utilisateur saved = utilisateurService.addUtilisateur(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}