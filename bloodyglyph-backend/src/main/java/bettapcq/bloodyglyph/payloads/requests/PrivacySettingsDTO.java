package bettapcq.bloodyglyph.payloads.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public record PrivacySettingsDTO(
        @Email(message = "Inserisci un'email valida")
        String email,
       
        String currentPassword,
        @Pattern(
                regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&._#\\-]).{8,}$",
                message = """
                        La password deve:
                        - avere almeno 8 caratteri
                        - contenere una lettera maiuscola
                        - contenere una lettera minuscola
                        - contenere un numero
                        - contenere un simbolo
                        """
        )
        String newPassword
) {
}
