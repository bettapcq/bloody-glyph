package bettapcq.bloodyglyph.controllers;


import bettapcq.bloodyglyph.exceptions.ValidationException;
import bettapcq.bloodyglyph.payloads.requests.*;
import bettapcq.bloodyglyph.payloads.responses.QrCodeResponseDTO;
import bettapcq.bloodyglyph.services.QrCodesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
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
    @Operation(summary = "Crea un nuovo QR Code di tipo URL")
    public QrCodeResponseDTO createQrCode(
            @RequestBody @Valid NewQrCodeDTO dto, BindingResult valRes
    ) {

        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }

        return qrCodesService.createQrCodeFromLink(dto);
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

    @Operation(summary = "Endpoint dedicato alla modifica di QR Code in un tipo URL")
    @PatchMapping("/{qrId}")
    public QrCodeResponseDTO updateMyQrCode(
            @PathVariable Long qrId,
            @RequestBody @Valid UpdateQrCodeDTO payload, BindingResult valRes
    ) {
        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }

        return qrCodesService.updateMyQrCode(qrId, payload);
    }

    @Operation(summary = "Elimina un QR Code dell'utente autenticato")
    @DeleteMapping("/{qrId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyQrCode(@PathVariable Long qrId) {
        qrCodesService.deleteMyQrCode(qrId);
    }

    @PatchMapping("/{qrId}/category")
    @Operation(summary = "Assegna o cambia una categoria a un QR Code dell'utente autenticato")
    public QrCodeResponseDTO assignCategoryToQrCode(@PathVariable Long qrId, @RequestBody @Valid AssignCategoryDTO payload, BindingResult valRes) {
        if (valRes.hasErrors()) {
            List<String> errList = valRes.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();

            throw new ValidationException(errList);
        }
        return qrCodesService.assignCategory(qrId, payload.categoryId());
    }


    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(
            summary = "Endpoint dedicato alla creazione di QR Code di tipo PDF o IMAGE"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public QrCodeResponseDTO createQrCodeFromFile(
            @ModelAttribute @Valid UploadQrCodeDTO payload
    ) {
        return qrCodesService.createQrCodeFromFile(
                payload,
                payload.file()
        );
    }

    @PatchMapping(
            value = "/{qrId}/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(
            summary = "Endpoint dedicato alla modifica di QR Code in un tipo PDF o IMAGE"
    )
    public QrCodeResponseDTO updateQrCodeFromFile(
            @PathVariable Long qrId,
            @ModelAttribute @Valid UpdateQrCodeFileDTO payload
    ) {
        return qrCodesService.updateMyQrCodeFile(
                qrId,
                payload,
                payload.file()
        );
    }

    @Operation(summary = "Dissassegna una categoria a un QR Code dell'utente autenticato")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{qrId}/category")
    public void disassignCategoryFromQrCode(@PathVariable Long qrId) {
        qrCodesService.disassignCategory(qrId);
    }
}
