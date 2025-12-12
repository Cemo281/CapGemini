package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.UtilisateurDTO;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.mapper.UtilisateurMapper;
import fr.polytech.poly_gemimi.service.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    private final UtilisateurMapper utilisateurMapper;

    public UtilisateurController(UtilisateurService utilisateurService, UtilisateurMapper utilisateurMapper) {
        this.utilisateurService = utilisateurService;
        this.utilisateurMapper = utilisateurMapper;
    }

    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUser(@RequestBody UtilisateurDTO dto){
        Utilisateur user = utilisateurMapper.toEntity(dto);
        Utilisateur saved = utilisateurService.addUtilisateur(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(utilisateurMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        List<UtilisateurDTO> utilisateurDTOs = utilisateurs.stream()
                .map(utilisateurMapper::toDto)
                .toList();
        return ResponseEntity.ok(utilisateurDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateur(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateur(id);
        return ResponseEntity.ok(utilisateurMapper.toDto(utilisateur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable Long id, @RequestBody UtilisateurDTO dto) {
        Utilisateur utilisateur = utilisateurMapper.toEntity(dto);
        utilisateurService.updateUtilisateur(id, utilisateur);
        Utilisateur updated = utilisateurService.getUtilisateur(id);
        return ResponseEntity.ok(utilisateurMapper.toDto(updated));
    }
}