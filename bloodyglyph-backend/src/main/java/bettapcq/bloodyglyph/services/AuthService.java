package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.payloads.requests.LoginDTO;
import bettapcq.bloodyglyph.payloads.responses.LoginResponseDTO;
import bettapcq.bloodyglyph.payloads.responses.UserResponseDTO;
import bettapcq.bloodyglyph.security.JWTTools;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final JWTTools jwtTools;
    private final AuthenticationManager authenticationManager;
    private final UsersService usersService;


    public AuthService(JWTTools jwtTools, AuthenticationManager authenticationManager, UsersService usersService) {
        this.jwtTools = jwtTools;
        this.authenticationManager = authenticationManager;
        this.usersService = usersService;
    }


    // metodo per login
    public LoginResponseDTO login(LoginDTO payload) {

        //verifica email e pwd
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        payload.email(),
                        payload.password()
                )
        );


        User user = usersService.findByEmail(payload.email());

        String token = jwtTools.generateToken(user);

        UserResponseDTO userResponse = new UserResponseDTO(
                user.getUserId(),
                user.getUsername(),
                user.getEmail()
        );

        return new LoginResponseDTO(token, userResponse);
    }
}
