package bettapcq.bloodyglyph.controllers;

import bettapcq.bloodyglyph.payloads.requests.PrivacySettingsDTO;
import bettapcq.bloodyglyph.payloads.responses.UserResponseDTO;
import bettapcq.bloodyglyph.services.UsersService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "Endpoint degli utenti")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/me")
    @Operation(
            summary = "Utente Loggato",
            description = "Recupera l'utente loggato e restituisce le sue info"
    )
    public UserResponseDTO getCurrentUser() {
        return usersService.getCurrentUser();
    }

    @PatchMapping("/me/privacy-settings")
    @Operation(summary = "Permette di modificare email e password dell'utente autenticato")
    public UserResponseDTO editProfileSecuritySettings(@RequestBody @Valid PrivacySettingsDTO payload, BindingResult valRes) {
        return usersService.editProfileSecurity(payload);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Elimina definitivamente l'account dell'utente autenticato")
    public void deleteMyAccount() {
        usersService.deleteMyAccount();
    }

}
