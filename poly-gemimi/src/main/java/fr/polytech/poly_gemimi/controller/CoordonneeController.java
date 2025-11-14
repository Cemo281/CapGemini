package fr.polytech.poly_gemimi.controller;

import fr.polytech.poly_gemimi.dto.CoordonneeDTO;
import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.service.CoordonneeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordonnees")
public class CoordonneeController {

    private final CoordonneeService coordonneeService;

    public CoordonneeController(CoordonneeService coordonneeService) {
        this.coordonneeService = coordonneeService;
    }

    @GetMapping("/add")
    public Coordonnee createCoordonnee(@RequestParam Float latitude,@RequestParam Float longitude){
        Coordonnee coordonnee = new Coordonnee();
        coordonnee.setLatitude(latitude);
        coordonnee.setLongitude(longitude);
        return(coordonneeService.addCoordonnee(coordonnee));
    }
}
