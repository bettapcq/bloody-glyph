package bettapcq.bloodyglyph.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewCategoryDTO(

        @NotBlank(message = "Il nome è obbligatorio")
        @Size(
                min = 2,
                max = 30,
                message = "Il nome della categoria deve contenere tra 2 e 30 caratteri."
        )
        String name
) {
}
