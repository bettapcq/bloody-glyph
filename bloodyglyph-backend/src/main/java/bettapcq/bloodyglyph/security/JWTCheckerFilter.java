package bettapcq.bloodyglyph.security;

import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.services.UsersService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JWTCheckerFilter extends OncePerRequestFilter {

    private final JWTTools jwtTools;
    private final UsersService usersService;

    public JWTCheckerFilter(JWTTools jwtTools, UsersService usersService) {
        this.jwtTools = jwtTools;
        this.usersService = usersService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        // Leggo l'header "Authorization" della richiesta HTTP.
        String authHeader = request.getHeader("Authorization");

        // Controllo se l'header Authorization non è presente oppure non inizia con "Bearer "
        // e lascio quindi proseguire la richiesta senza autenticare nessun utente.
        // Se la rotta è pubblica, come /auth/login, la richiesta sarà accettata.
        // Se la rotta è protetta, Spring Security la bloccherà successivamente.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Rimuovo la parte iniziale "Bearer " dall'header. (B r e a r e r -> 7 caratteri incluso lo spazio)
            String token = authHeader.substring(7);

            //Verifico che i token sia valido ed straggo il subject (ID) contenuto nel JWT (che è una stringa)
            String subject = jwtTools.extractSubject(token);

            //Converto la stringa in Long
            Long userId = Long.parseLong(subject);

            //Cerco nel db lo user che ha quell'ID
            User user = usersService.findById(userId);


            // Creo un oggetto Authentication riconosciuto da Spring Security
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user,  // È il principal, cioè l'utente autenticato.
                            null,  //Sarebbero le credenziali, normalmente la password (non servono perché il JWT è già stato verificato)
                            List.of()   // È la lista dei permessi o ruoli dell'utente.
                            // (questo progetto non gestisce ancora ruoli, quindi uso una lista vuota,
                            // nel caso integrassi i diversi ruoli -ADMIN/USER- dovrei cambiarlo in "user.getAuthorities())
                    );

            // Salvo l'autenticazione nel SecurityContext di Spring. Da questo momento, per la durata della richiesta corrente, Spring
            // considera l'utente autenticato. Nei controller o nei service sarà possibile recuperare l'utente tramite
            // il SecurityContext oppure tramite @AuthenticationPrincipal.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (JwtException | NumberFormatException e) {
            // Token non valido oppure subject non numerico:
            // non viene inserita alcuna autenticazione nel SecurityContext.
        }

        // Faccio proseguire la richiesta verso gli altri filtri e, se tutti i controlli vengono superati, verso il controller.
        filterChain.doFilter(request, response);
    }
}
