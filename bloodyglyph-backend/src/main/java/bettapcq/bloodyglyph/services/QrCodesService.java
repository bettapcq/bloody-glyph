package bettapcq.bloodyglyph.services;


import bettapcq.bloodyglyph.entities.QrCode;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UpdateQrCodeDTO;
import bettapcq.bloodyglyph.payloads.responses.CloudinaryUploadResponseDTO;
import bettapcq.bloodyglyph.payloads.responses.QrCodeResponseDTO;
import bettapcq.bloodyglyph.repositories.QrCodesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class QrCodesService {

    private final QrCodesRepository qrCodesRepository;
    private final UsersService usersService;
    private final QrImagesService qrImagesService;
    private final CloudinaryService cloudinaryService;


    public QrCodesService(QrCodesRepository qrCodesRepository, UsersService usersService, QrImagesService qrImagesService, CloudinaryService cloudinaryService) {
        this.qrCodesRepository = qrCodesRepository;
        this.usersService = usersService;
        this.qrImagesService = qrImagesService;
        this.cloudinaryService = cloudinaryService;

    }

    private static final int FREE_QR_CODE_LIMIT = 3;


    private QrCodeResponseDTO toQrCodeResponseDTO(QrCode qrCode) {

        return new QrCodeResponseDTO(
                qrCode.getQrId(),
                qrCode.getTitle(),
                qrCode.getContent(),
                qrCode.getQrImageUrl(),
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


        //Genero l'immagine del QR personalizzato
        byte[] qrImage = qrImagesService.generateQrImage(
                payload.content()
        );

        //Carico l'immagine su Cloudinary
        CloudinaryUploadResponseDTO upload =
                cloudinaryService.uploadQrImage(qrImage);

        //Creo l'entity
        QrCode qrCode = QrCode.builder()
                .title(payload.title())
                .content(payload.content())
                .qrImageUrl(upload.secureUrl())
                .qrImagePublicId(upload.publicId())
                .user(currentUser)
                .build();

        QrCode savedQrCode = qrCodesRepository.save(qrCode);

        return toQrCodeResponseDTO(savedQrCode);

    }


    public List<QrCodeResponseDTO> getMyQrCodes() {

        User currentUser = usersService.getCurrentUserEntity();

        List<QrCode> qrCodes = qrCodesRepository.findByUser(currentUser);

        return qrCodes.stream()
                .map(this::toQrCodeResponseDTO)
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

        return toQrCodeResponseDTO(getMyQrEntity(qrId));

    }

    public QrCodeResponseDTO updateMyQrCode(Long qrId, UpdateQrCodeDTO payload) {

        QrCode found = getMyQrEntity(qrId);

        if (payload.title() != null) {
            found.setTitle(payload.title());
        }

        if (payload.content() != null
                && !Objects.equals(payload.content(), found.getContent())) {

            // Salvo il publicId della vecchia immagine
            String oldPublicId = found.getQrImagePublicId();

            // Genero il nuovo QR
            byte[] qrImage = qrImagesService.generateQrImage(
                    payload.content()
            );

            // Carico prima la nuova immagine
            CloudinaryUploadResponseDTO upload =
                    cloudinaryService.uploadQrImage(qrImage);

            // Aggiorno tutti i dati nell'entity
            found.setContent(payload.content());
            found.setQrImageUrl(upload.secureUrl());
            found.setQrImagePublicId(upload.publicId());

            // Elimino la vecchia immagine solo dopo il nuovo upload
            if (oldPublicId != null && !oldPublicId.isBlank()) {
                cloudinaryService.deleteQrImage(oldPublicId);
            }
        }

        QrCode qrCodeUpdated = qrCodesRepository.save(found);
        return toQrCodeResponseDTO(qrCodeUpdated);
    }

    public void deleteMyQrCode(Long qrId) {
        QrCode found = getMyQrEntity(qrId);
        cloudinaryService.deleteQrImage(found.getQrImagePublicId());
        qrCodesRepository.delete(found);
    }
}
