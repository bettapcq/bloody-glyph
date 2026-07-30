package bettapcq.bloodyglyph.services;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.RegisterDTO;
import bettapcq.bloodyglyph.payloads.responses.UserResponseDTO;
import bettapcq.bloodyglyph.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User findById(Long id){
        return this.usersRepository.findById(id).orElseThrow( ()->new NotFoundException("Utente non trovato"));
    }

    public User findByEmail(String email) {
        return this.usersRepository.findByEmail(email).orElseThrow( ()->new NotFoundException("Email non trovataPublic"));
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

        //restituisti il dto
        return new UserResponseDTO(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );
    }

}
