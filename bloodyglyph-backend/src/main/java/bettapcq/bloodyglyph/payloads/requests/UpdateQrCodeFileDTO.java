package bettapcq.bloodyglyph.payloads.requests;

import bettapcq.bloodyglyph.entities.QrContentType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record UpdateQrCodeFileDTO(

        @NotBlank(message = "Il titolo è obbligatorio.")
        String title,

        @NotNull(message = "Il tipo di contenuto è obbligatorio.")
        QrContentType contentType,

        Long categoryId,

        @Schema(type = "string", format = "binary")
        MultipartFile file

) {
}