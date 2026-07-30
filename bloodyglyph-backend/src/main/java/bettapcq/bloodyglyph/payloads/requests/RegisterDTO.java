package bettapcq.bloodyglyph.payloads.requests;

import jakarta.validation.constraints.*;


public record RegisterDTO(

        @NotBlank(message = "L'username è obbligatorio")
        @Size(min = 3, max = 30, message = "L'username deve contenere tra 3 e 30 caratteri")
        String username,

        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Email non valida")
        String email,

        @NotBlank(message = "La password è obbligatoria")
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
        String password

) {}