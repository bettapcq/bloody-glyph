package bettapcq.bloodyglyph.controllers;


import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
import bettapcq.bloodyglyph.payloads.responses.QrCodeResponseDTO;
import bettapcq.bloodyglyph.services.QrCodesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/qr")
@Tag(name = "Qr Codes", description = "Endpoint per la gestione dei QR Code")
public class QrCodesController {

    private final QrCodesService qrCodesService;

    public QrCodesController(QrCodesService qrCodesService) {
        this.qrCodesService = qrCodesService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crea un nuovo QR Code")
    public QrCodeResponseDTO createQrCode(
            @RequestBody @Valid NewQrCodeDTO dto
    ) {
        return qrCodesService.createQrCode(dto);
    }

    @Operation(summary = "Recupera tutti i QR Code dell'utente autenticato")
    @GetMapping
    public List<QrCodeResponseDTO> getMyQrCodes() {
        return qrCodesService.getMyQrCodes();
    }

}
