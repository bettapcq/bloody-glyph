package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Collections;

@Service
@Slf4j

//implemento UserDetailsService in questa classe, lasciando così a Spring Security il compito di gestire il processo di autenticazione (vedi differenza approccio manuale su progetto PopcornPal)
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailgunService mailgunService;

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder, MailgunService mailgunService) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailgunService = mailgunService;
    }

    public User findById(Long id) {
        return this.usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }

    public User findByEmail(String email) {
        return this.usersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Email non trovata"));
    }

    public UserResponseDTO register(RegisterDTO payload) {

        // check username già esistente
        if (usersRepository.existsByUsername(payload.username())) {
            throw new BadRequestException("Username già utilizzato");
        }

        //check email già esistente
        if (usersRepository.existsByEmail(payload.email())) {
            throw new BadRequestException("Email già utilizzata");
        }

        //crea nuovo user
        User newUser = User.builder()
                .username(payload.username())
                .email(payload.email())
                .password(passwordEncoder.encode(payload.password()))
                .build();

        //salva in db
        User savedUser = usersRepository.save(newUser);

        // Invia l'email di benvenuto all'utente appena registrato
        mailgunService.sendRegistrationEmail(savedUser);

        //restituisci il dto
        return new UserResponseDTO(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );
    }

    //Metodo che mi serve restiture l'entity dell'utente autenticato, recuperandola dal SecurityContext.
    public User getCurrentUserEntity() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();
        return (User) authentication.getPrincipal();
    }

    //Metodo per restituire il dto dell'utente autenticato
    public UserResponseDTO getCurrentUser() {

        User userLogged = getCurrentUserEntity();

        return new UserResponseDTO(
                userLogged.getUserId(),
                userLogged.getUsername(),
                userLogged.getEmail()
        );
    }

    //--- reset password

    public String generatePassword(int length) {

        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();

        StringBuilder password = new StringBuilder();


        for (int i = 0; i < length; i++) {
            int index = random.nextInt(chars.length());
            password.append(chars.charAt(index));
        }

        return password.toString();
    }

    public void resetPasswordByEmail(String email) {
        //check if email exists in db
        User found = this.usersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Non siste un account associato a questa email"));

        if (found != null) {
            String temporaryPassword = generatePassword(10);

            found.setPassword(passwordEncoder.encode(temporaryPassword));
            User userUpdated = usersRepository.save(found);
            mailgunService.sendResetPasswordEmail(userUpdated, temporaryPassword);

        }
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
