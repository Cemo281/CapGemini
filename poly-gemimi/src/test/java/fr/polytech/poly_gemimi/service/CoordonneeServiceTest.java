package fr.polytech.poly_gemimi.service;

import fr.polytech.poly_gemimi.entity.Coordonnee;
import fr.polytech.poly_gemimi.exception.BadRequestException;
import fr.polytech.poly_gemimi.repository.CoordonneeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CoordonneeServiceTest {

    @Mock
    private CoordonneeRepository coordonneeRepository;

    @InjectMocks
    private CoordonneeService coordonneeService;

    @Test
    public void addCoordonnee_invalidLatitude_throwsBadRequest() {
        Coordonnee c = new Coordonnee();
        c.setLatitude("100.0"); // invalid
        c.setLongitude("10.0");
        when(coordonneeRepository.save(c)).thenReturn(c);

        assertThrows(BadRequestException.class, () -> coordonneeService.addCoordonnee(c));
    }

    @Test
    public void addCoordonnee_nonNumeric_throwsBadRequest() {
        Coordonnee c = new Coordonnee();
        c.setLatitude("not-a-number");
        c.setLongitude("10.0");
        when(coordonneeRepository.save(c)).thenReturn(c);

        assertThrows(BadRequestException.class, () -> coordonneeService.addCoordonnee(c));
    }

    @Test
    public void addCoordonnee_valid_ok() {
        Coordonnee c = new Coordonnee();
        c.setLatitude("45.0");
        c.setLongitude("2.0");
        when(coordonneeRepository.save(c)).thenReturn(c);

        coordonneeService.addCoordonnee(c);
    }
}
