package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.ReservationDTO;
import fr.polytech.poly_gemimi.dto.TerrainDTO;
import fr.polytech.poly_gemimi.dto.UtilisateurDTO;
import fr.polytech.poly_gemimi.entity.Terrain;
import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.mapper.TerrainMapper;
import fr.polytech.poly_gemimi.mapper.UtilisateurMapper;
import fr.polytech.poly_gemimi.service.UtilisateurService;
import fr.polytech.poly_gemimi.service.TerrainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final UtilisateurService utilisateurService;
    private final TerrainService terrainService;
    private final UtilisateurMapper utilisateurMapper;
    private final TerrainMapper terrainMapper;

    public ReservationController(UtilisateurService utilisateurService, TerrainService terrainService, UtilisateurMapper utilisateurMapper, TerrainMapper terrainMapper) {
        this.utilisateurService = utilisateurService;
        this.terrainService = terrainService;
        this.utilisateurMapper = utilisateurMapper;
        this.terrainMapper = terrainMapper;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<Utilisateur> utilisateurs = utilisateurService.getAllUtilisateurs();
        List<ReservationDTO> reservations = utilisateurs.stream()
                .filter(u -> u.getTerrains() != null && !u.getTerrains().isEmpty())
                .map(u -> {
                    ReservationDTO res = new ReservationDTO();
                    res.setId(u.getId());
                    res.setUtilisateur(utilisateurMapper.toDto(u));
                    if (u.getTerrains() != null) {
                        res.setTerrains(u.getTerrains().stream()
                                .map(terrainMapper::toDto)
                                .collect(Collectors.toSet()));
                    }
                    return res;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservations);
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO dto) {
        if (dto.getUtilisateur() == null || dto.getUtilisateur().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        Utilisateur utilisateur = utilisateurService.getUtilisateur(dto.getUtilisateur().getId());
        if (dto.getTerrains() != null && !dto.getTerrains().isEmpty()) {
            utilisateur.setTerrains(dto.getTerrains().stream()
                    .filter(t -> t.getId() != null)
                    .map(t -> terrainService.getTerrain(t.getId()))
                    .collect(Collectors.toSet()));
        }
        utilisateurService.updateUtilisateur(utilisateur.getId(), utilisateur);
        Utilisateur updated = utilisateurService.getUtilisateur(utilisateur.getId());
        ReservationDTO res = new ReservationDTO();
        res.setId(updated.getId());
        res.setUtilisateur(utilisateurMapper.toDto(updated));
        if (updated.getTerrains() != null) {
            res.setTerrains(updated.getTerrains().stream()
                    .map(terrainMapper::toDto)
                    .collect(Collectors.toSet()));
        }
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateur(id);
        utilisateur.setTerrains(null);
        utilisateurService.updateUtilisateur(id, utilisateur);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(
            @PathVariable Long id,
            @RequestBody ReservationDTO dto) {
        Utilisateur utilisateur = utilisateurService.getUtilisateur(id);
        if (utilisateur == null) {
            return ResponseEntity.notFound().build();
        }
        if (dto.getTerrains() != null) {
            utilisateur.setTerrains(
                    dto.getTerrains().stream()
                            .filter(t -> t.getId() != null)
                            .map(t -> terrainService.getTerrain(t.getId()))
                            .collect(Collectors.toSet())
            );
        } else {
            utilisateur.setTerrains(null);
        }
        utilisateurService.updateUtilisateur(id, utilisateur);
        Utilisateur updated = utilisateurService.getUtilisateur(id);
        ReservationDTO res = new ReservationDTO();
        res.setId(updated.getId());
        res.setUtilisateur(utilisateurMapper.toDto(updated));
        if (updated.getTerrains() != null) {
            res.setTerrains(updated.getTerrains().stream()
                    .map(terrainMapper::toDto)
                    .collect(Collectors.toSet()));
        }
        return ResponseEntity.ok(res);
    }

}
