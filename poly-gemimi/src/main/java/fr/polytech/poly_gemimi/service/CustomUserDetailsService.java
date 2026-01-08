package fr.polytech.poly_gemimi.service;

import fr.polytech.poly_gemimi.entity.Utilisateur;
import fr.polytech.poly_gemimi.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Loading user: " + username);
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        System.out.println("User found: " + utilisateur.getUsername() + " with role: " + utilisateur.getRole());
        String rawRole = utilisateur.getRole();
        String role;
        if (rawRole != null) {
            String r = rawRole.trim().toUpperCase();
            if ("ADMIN".equals(r) || "USER".equals(r)) {
                role = "ROLE_" + r;
            } else {
                System.out.println("Warning: invalid role '" + rawRole + "' for user " + utilisateur.getUsername() + ", defaulting to USER");
                role = "ROLE_USER";
            }
        } else {
            role = "ROLE_USER";
        }
        Collection<? extends GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));
        return new User(utilisateur.getUsername(), utilisateur.getPassword(), authorities);
    }
}
