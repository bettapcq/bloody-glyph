package bettapcq.bloodyglyph.payloads.responses;

import java.time.LocalDateTime;

public record QrCodeResponseDTO(
        Long qrId,
        String title,
        String content,
        LocalDateTime createdAt,
        Long userId,
        Long categoryId
) {
}
