package bettapcq.bloodyglyph.services;


import bettapcq.bloodyglyph.entities.QrCode;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
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

    public QrCodeResponseDTO createQrCode(NewQrCodeDTO payload) {
        User currentUser = usersService.getCurrentUserEntity();

        QrCode qrCode = QrCode.builder()
                .title(payload.title())
                .content(payload.content())
                .user(currentUser)
                .build();

        QrCode savedQrCode = qrCodesRepository.save(qrCode);

        return new QrCodeResponseDTO(
                savedQrCode.getQrId(),
                savedQrCode.getTitle(),
                savedQrCode.getContent(),
                savedQrCode.getCreatedAt(),
                savedQrCode.getUser().getUserId(),
                null
        );
    }


    public List<QrCodeResponseDTO> getMyQrCodes() {

        User currentUser = usersService.getCurrentUserEntity();

        List<QrCode> qrCodes = qrCodesRepository.findByUser(currentUser);

        return qrCodes.stream()
                .map(qrCode -> new QrCodeResponseDTO(
                        qrCode.getQrId(),
                        qrCode.getTitle(),
                        qrCode.getContent(),
                        qrCode.getCreatedAt(),
                        qrCode.getUser().getUserId(),
                        qrCode.getCategory() == null
                                ? null
                                : qrCode.getCategory().getCategoryId()
                ))
                .toList();
    }

}
