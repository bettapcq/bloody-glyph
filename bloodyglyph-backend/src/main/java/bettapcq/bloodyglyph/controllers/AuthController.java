package bettapcq.bloodyglyph.controllers;

import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.ValidationException;
import bettapcq.bloodyglyph.payloads.requests.LoginDTO;
import bettapcq.bloodyglyph.payloads.requests.RegisterDTO;
import bettapcq.bloodyglyph.payloads.responses.LoginResponseDTO;
import bettapcq.bloodyglyph.payloads.responses.UserResponseDTO;
import bettapcq.bloodyglyph.services.AuthService;
import bettapcq.bloodyglyph.services.MailgunService;
import bettapcq.bloodyglyph.services.UsersService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Endpoint per registrazione e login")
public class AuthController {

    private final UsersService usersService;
    private final AuthService authService;
    private final MailgunService mailgunService;

    public AuthController(UsersService usersService, AuthService authService, MailgunService mailgunService) {
        this.usersService = usersService;
        this.authService = authService;
        this.mailgunService = mailgunService;
    }


    //register
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Registrazione",
            description = "Aggiunge nuovo user nel db"
    )
    public UserResponseDTO register(@RequestBody @Valid RegisterDTO payload, BindingResult valRes) {

        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }

        return usersService.register(payload);
    }

    @PostMapping("/login")
    @Operation(
            summary = "Login utente",
            description = "Autentica un utente tramite email e password e restituisce un token JWT valido insieme ai dati dell'utente."
    )
    public LoginResponseDTO login(
            @RequestBody @Valid LoginDTO payload,
            BindingResult valRes
    ) {
        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }

        return authService.login(payload);
    }

    @PostMapping("/test-email")
    @Operation(summary = "Invia un'email di test")
    public void testEmail() {

        User user = usersService.findByEmail("betta.pcq@gmail.com");

        mailgunService.sendRegistrationEmail(user);

    }

}
