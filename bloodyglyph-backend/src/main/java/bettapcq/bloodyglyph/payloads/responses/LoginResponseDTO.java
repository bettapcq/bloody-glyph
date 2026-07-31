package bettapcq.bloodyglyph.payloads.responses;

public record LoginResponseDTO(
        String token,
        UserResponseDTO user
) {
}
