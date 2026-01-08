package fr.polytech.poly_gemimi.service;

import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.repository.UtilisateurRepository;
import fr.polytech.poly_gemimi.exception.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UtilisateurServiceTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @InjectMocks
    private UtilisateurService utilisateurService;

    @Test
    public void addUtilisateur_invalidEmail_throwsBadRequest() {
        Utilisateur u = new Utilisateur();
        u.setUsername("foo");
        u.setMail("not-an-email");
        u.setPassword("Passw0rd");
        when(utilisateurRepository.save(u)).thenReturn(u);

        assertThrows(BadRequestException.class, () -> utilisateurService.addUtilisateur(u));
    }

    @Test
    public void addUtilisateur_invalidPassword_throwsBadRequest() {
        Utilisateur u = new Utilisateur();
        u.setUsername("foo");
        u.setMail("user@example.com");
        u.setPassword("short");
        when(utilisateurRepository.save(u)).thenReturn(u);

        assertThrows(BadRequestException.class, () -> utilisateurService.addUtilisateur(u));
    }

    @Test
    public void addUtilisateur_valid_ok() {
        Utilisateur u = new Utilisateur();
        u.setUsername("foo");
        u.setMail("user@example.com");
        u.setPassword("Password1");
        when(utilisateurRepository.save(u)).thenReturn(u);

        utilisateurService.addUtilisateur(u);
    }
}
