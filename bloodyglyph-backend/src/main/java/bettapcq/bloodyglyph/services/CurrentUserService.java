package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

//ho creato una classe a parte per questo metodo per evitare il Circular Dependency tra i bean

@Service
public class CurrentUserService {

    //Metodo che mi serve restiture l'entity dell'utente autenticato, recuperandola dal SecurityContext.
    public User getCurrentUserEntity() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return (User) authentication.getPrincipal();
    }
}