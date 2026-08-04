package bettapcq.bloodyglyph.payloads.requests;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AssignCategoryDTO(

        @NotNull(message = "L'id della categoria è obbligatorio")
        @Positive(message = "L'id della categoria deve essere valido")
        Long categoryId

) {
}

