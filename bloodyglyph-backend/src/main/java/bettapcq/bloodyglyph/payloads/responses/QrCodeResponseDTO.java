package bettapcq.bloodyglyph.payloads.responses;

import bettapcq.bloodyglyph.entities.QrContentType;

import java.time.LocalDateTime;

public record QrCodeResponseDTO(
        Long qrId,
        String title,
        String content,
        String qrImageUrl,
        LocalDateTime createdAt,
        QrContentType contentType,
        Long userId,
        Long categoryId,
        String categoryName,
        String originalFileName
) {
}
