package bettapcq.bloodyglyph.payloads.requests;

import bettapcq.bloodyglyph.entities.QrContentType;
import jakarta.validation.constraints.NotNull;

public record UpdateQrCodeDTO(
        String title,
        String content,
        @NotNull(message = "Il tipo di contenuto è obbligatorio.")
        QrContentType contentType
) {
}
