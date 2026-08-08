package bettapcq.bloodyglyph.controllers;

import bettapcq.bloodyglyph.services.QrCodesService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

// Questo è l'endèpoint per il redirect del QrCode

@RestController
@RequestMapping("/q")
@Hidden
public class PublicQrController {

    private final QrCodesService qrCodesService;

    public PublicQrController(QrCodesService qrCodesService) {
        this.qrCodesService = qrCodesService;
    }

    @GetMapping("/{publicCode}")
    public ResponseEntity<Void> redirectToContent(
            @PathVariable String publicCode
    ) {
        String destination =
                qrCodesService.resolveDestination(publicCode);

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(destination))
                .header(
                        HttpHeaders.CACHE_CONTROL,
                        "no-store, no-cache, must-revalidate"
                )
                .header(HttpHeaders.PRAGMA, "no-cache")
                .build();

    }
}