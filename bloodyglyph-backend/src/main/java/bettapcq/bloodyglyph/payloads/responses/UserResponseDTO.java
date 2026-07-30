package bettapcq.bloodyglyph.payloads.responses;

public record UserResponseDTO(
        Long userId,
        String username,
        String email
) {
}
