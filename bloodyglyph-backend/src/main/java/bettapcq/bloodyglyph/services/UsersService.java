package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.RegisterDTO;
import bettapcq.bloodyglyph.payloads.responses.UserResponseDTO;
import bettapcq.bloodyglyph.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j

//implemento UserDetailsService in questa classe, lasciando così a Spring Security il compito di gestire il processo di autenticazione (vedi differenza approccio manuale su progetto PopcornPal)
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User findById(Long id) {
        return this.usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }

    public User findByEmail(String email) {
        return this.usersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Email non trovataPublic"));
    }

    public UserResponseDTO register(RegisterDTO payload) {

        // check username già esistente
        if (usersRepository.existsByUsername(payload.username())) {
            throw new RuntimeException("Username già utilizzato");
        }

        //check email già esistente
        if (usersRepository.existsByEmail(payload.email())) {
            throw new RuntimeException("Email già utilizzata");
        }

        //crea nuovo user
        User newUser = User.builder()
                .username(payload.username())
                .email(payload.email())
                .password(passwordEncoder.encode(payload.password()))
                .build();

        //salva in db
        User savedUser = usersRepository.save(newUser);

        //restituisci il dto
        return new UserResponseDTO(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );
    }

    //Metodo che mi serve per estrarre lo user attualmente loggato (salvato come principal nel security context) e restituire il suo DTO
    public UserResponseDTO getUserLogged() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User currentUser = (User) authentication.getPrincipal();


        return new UserResponseDTO(
                currentUser.getUserId(),
                currentUser.getUsername(),
                currentUser.getEmail()
        );
    }

    //override di UserDetailsService dove inserisco le istruzioni su come effettuare l'autenticazione (tramite mail e pwd in questo caso)
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User found = usersRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found")
                );

        return org.springframework.security.core.userdetails.User
                .withUsername(found.getEmail())
                .password(found.getPassword())
                .authorities(Collections.emptyList()) //al momento il progetto non prevede ruoli, quindi uso emptyList
                .build();
    }
}
