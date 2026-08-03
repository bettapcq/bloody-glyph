package bettapcq.bloodyglyph.payloads.requests;

import jakarta.validation.constraints.NotBlank;

public record NewQrCodeDTO(
        @NotBlank(message = "Il titolo è obbligatorio")
        String title,

        @NotBlank(message = "Il contenuto è obbligatorio")
        String content
) {
}