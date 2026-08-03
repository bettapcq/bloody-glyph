package bettapcq.bloodyglyph.controllers;


import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UpdateQrCodeDTO;
import bettapcq.bloodyglyph.payloads.responses.QrCodeResponseDTO;
import bettapcq.bloodyglyph.services.QrCodesService;
import bettapcq.bloodyglyph.services.QrImagesService;
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
    private final QrImagesService qrImagesService;

    public QrCodesController(QrCodesService qrCodesService) {
        this.qrCodesService = qrCodesService;
        this.qrImagesService = new QrImagesService();
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

    @Operation(summary = "Recupera il QR Code dell'utente autenticato tramite l'ID")
    @GetMapping("/{qrId}")
    public QrCodeResponseDTO getMyQrCode(@PathVariable Long qrId) {
        return qrCodesService.getMyQrCodeById(qrId);
    }

    @Operation(summary = "Modifica un QR Code dell'utente autenticato")
    @PatchMapping("/{qrId}")
    public QrCodeResponseDTO updateMyQrCode(
            @PathVariable Long qrId,
            @RequestBody @Valid UpdateQrCodeDTO payload
    ) {
        return qrCodesService.updateMyQrCode(qrId, payload);
    }

    @Operation(summary = "Elimina un QR Code dell'utente autenticato")
    @DeleteMapping("/{qrId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyQrCode(@PathVariable Long qrId) {
        qrCodesService.deleteMyQrCode(qrId);
    }
}
