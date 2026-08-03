package bettapcq.bloodyglyph.services;


import bettapcq.bloodyglyph.entities.QrCode;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UpdateQrCodeDTO;
import bettapcq.bloodyglyph.payloads.responses.QrCodeResponseDTO;
import bettapcq.bloodyglyph.repositories.QrCodesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QrCodesService {

    private QrCodesRepository qrCodesRepository;
    private final UsersService usersService;

    public QrCodesService(QrCodesRepository qrCodesRepository, UsersService usersService) {
        this.qrCodesRepository = qrCodesRepository;
        this.usersService = usersService;
    }

    private static final int FREE_QR_CODE_LIMIT = 3;


    private QrCodeResponseDTO toResponseDTO(QrCode qrCode) {

        return new QrCodeResponseDTO(
                qrCode.getQrId(),
                qrCode.getTitle(),
                qrCode.getContent(),
                qrCode.getCreatedAt(),
                qrCode.getUser().getUserId(),
                qrCode.getCategory() == null
                        ? null
                        : qrCode.getCategory().getCategoryId()
        );
    }

    public QrCodeResponseDTO createQrCode(NewQrCodeDTO payload) {
        User currentUser = usersService.getCurrentUserEntity();

        long currentQrCodes = qrCodesRepository.countByUser(currentUser);

        if (currentQrCodes >= FREE_QR_CODE_LIMIT) {
            throw new BadRequestException(
                    "Hai raggiunto il limite massimo di "
                            + FREE_QR_CODE_LIMIT
                            + " QR Code."
            );
        }

        QrCode qrCode = QrCode.builder()
                .title(payload.title())
                .content(payload.content())
                .user(currentUser)
                .build();

        QrCode savedQrCode = qrCodesRepository.save(qrCode);

        return toResponseDTO(savedQrCode);

    }


    public List<QrCodeResponseDTO> getMyQrCodes() {

        User currentUser = usersService.getCurrentUserEntity();

        List<QrCode> qrCodes = qrCodesRepository.findByUser(currentUser);

        return qrCodes.stream()
                .map(this::toResponseDTO)
                .toList();
    }


    private QrCode getMyQrEntity(Long qrId) {

        User currentUser = usersService.getCurrentUserEntity();

        return qrCodesRepository
                .findByQrIdAndUser(qrId, currentUser)
                .orElseThrow(() ->
                        new NotFoundException("QR Code non trovato.")
                );
    }

    public QrCodeResponseDTO getMyQrCodeById(Long qrId) {

        return toResponseDTO(getMyQrEntity(qrId));

    }

    public QrCodeResponseDTO updateMyQrCode(Long qrId, UpdateQrCodeDTO payload) {

        QrCode found = getMyQrEntity(qrId);

        if (payload.title() != null) {
            found.setTitle(payload.title());
        }
        if (payload.content() != null) {
            found.setContent(payload.content());
        }
        QrCode qrCodeUpdated = qrCodesRepository.save(found);

        return toResponseDTO(qrCodeUpdated);
    }


    public void deleteMyQrCode(Long qrId) {

        qrCodesRepository.delete(getMyQrEntity(qrId));
    }
}
