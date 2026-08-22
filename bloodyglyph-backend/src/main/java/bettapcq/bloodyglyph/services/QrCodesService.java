package bettapcq.bloodyglyph.services;


import bettapcq.bloodyglyph.entities.Category;
import bettapcq.bloodyglyph.entities.QrCode;
import bettapcq.bloodyglyph.entities.QrContentType;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UpdateQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UploadQrCodeDTO;
import bettapcq.bloodyglyph.payloads.responses.CloudinaryUploadResponseDTO;
import bettapcq.bloodyglyph.payloads.responses.QrCodeResponseDTO;
import bettapcq.bloodyglyph.repositories.QrCodesRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public class QrCodesService {

    @Value("${app.backend-url}")
    private String backendUrl;

    private final QrCodesRepository qrCodesRepository;
    private final CurrentUserService currentUserService;
    private final QrImagesService qrImagesService;
    private final CloudinaryService cloudinaryService;
    private final CategoriesService categoriesService;


    public QrCodesService(QrCodesRepository qrCodesRepository, QrImagesService qrImagesService, CloudinaryService cloudinaryService, CategoriesService categoriesService, CurrentUserService currentUserService) {
        this.qrCodesRepository = qrCodesRepository;
        this.currentUserService = currentUserService;
        this.qrImagesService = qrImagesService;
        this.cloudinaryService = cloudinaryService;
        this.categoriesService = categoriesService;

    }

    private static final int FREE_QR_CODE_LIMIT = 3;


    private QrCodeResponseDTO toQrCodeResponseDTO(QrCode qrCode) {

        return new QrCodeResponseDTO(
                qrCode.getQrId(),
                qrCode.getTitle(),
                qrCode.getContent(),
                qrCode.getQrImageUrl(),
                qrCode.getCreatedAt(),
                qrCode.getContentType(),
                qrCode.getUser().getUserId(),
                qrCode.getCategory() == null
                        ? null
                        : qrCode.getCategory().getCategoryId(),
                qrCode.getCategory() == null ? null : qrCode.getCategory().getName()
        );
    }

    private User validateQrLimit() {
        User currentUser = currentUserService.getCurrentUserEntity();

        long currentQrCodes = qrCodesRepository.countByUser(currentUser);

        if (currentQrCodes >= FREE_QR_CODE_LIMIT) {
            throw new BadRequestException(
                    "Hai raggiunto il limite massimo di "
                            + FREE_QR_CODE_LIMIT
                            + " QR Code."
            );
        }

        return currentUser;
    }

    private CloudinaryUploadResponseDTO generateQrImage(String publicCode) {

        // Creo l'URL che verrà inserito nell'immagine del QR
        String qrUrl = backendUrl + "/q/" + publicCode;

        //Genero l'immagine del QR personalizzato
        byte[] qrImage = qrImagesService.generateQrImage(qrUrl);

        //Carico l'immagine su Cloudinary
        return cloudinaryService.uploadQrImage(qrImage);
    }

    public QrCodeResponseDTO createQrCodeFromLink(NewQrCodeDTO payload) {


        User currentUser = validateQrLimit();


        if (payload.contentType() != QrContentType.URL) {
            throw new BadRequestException(
                    "Per immagini e PDF utilizza l'endpoint dedicato."
            );
        }

        // Genero un codice pubblico diverso per ogni QR
        String publicCode = UUID.randomUUID().toString();

        CloudinaryUploadResponseDTO qrUpload =
                generateQrImage(publicCode);


        //Creo l'entity
        QrCode qrCode = QrCode.builder()
                .title(payload.title())
                .content(payload.content())
                .contentType(payload.contentType())
                .publicCode(publicCode)
                .qrImageUrl(qrUpload.secureUrl())
                .qrImagePublicId(qrUpload.publicId())
                .user(currentUser)
                .build();

        QrCode savedQrCode = qrCodesRepository.save(qrCode);

        return toQrCodeResponseDTO(savedQrCode);

    }

    public QrCodeResponseDTO createQrCodeFromFile(
            UploadQrCodeDTO payload,
            MultipartFile file
    ) {

        User currentUser = validateQrLimit();

        if (payload.contentType() == QrContentType.URL) {
            throw new BadRequestException(
                    "Per i link utilizza l'endpoint dedicato."
            );
        }

        CloudinaryUploadResponseDTO contentUpload =
                cloudinaryService.uploadContent(
                        file,
                        payload.contentType()
                );

        String publicCode = UUID.randomUUID().toString();

        CloudinaryUploadResponseDTO qrUpload =
                generateQrImage(publicCode);

        QrCode qrCode = QrCode.builder()
                .title(payload.title())
                .content(contentUpload.secureUrl())
                .contentType(payload.contentType())
                .contentPublicId(contentUpload.publicId())
                .publicCode(publicCode)
                .qrImageUrl(qrUpload.secureUrl())
                .qrImagePublicId(qrUpload.publicId())
                .user(currentUser)
                .build();

        QrCode savedQrCode = qrCodesRepository.save(qrCode);

        return toQrCodeResponseDTO(savedQrCode);
    }

    public String resolveDestination(String publicCode) {

        QrCode qrCode = qrCodesRepository.findByPublicCode(publicCode)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Questo QR Code non è più disponibile."
                        )
                );

        return qrCode.getContent();
    }


    public List<QrCodeResponseDTO> getMyQrCodes() {

        User currentUser = currentUserService.getCurrentUserEntity();

        List<QrCode> qrCodes = qrCodesRepository.findByUser(currentUser);

        return qrCodes.stream()
                .map(this::toQrCodeResponseDTO)
                .toList();
    }


    private QrCode getMyQrEntity(Long qrId) {

        User currentUser = currentUserService.getCurrentUserEntity();

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

        if (payload.contentType() != QrContentType.URL) {
            throw new BadRequestException(
                    "Per convertire in immagini e PDF utilizza l'endpoint dedicato."
            );
        }

        // Se prima era IMAGE o PDF, elimino il vecchio file da Cloudinary
        if (found.getContentType() != QrContentType.URL
                && found.getContentPublicId() != null) {
            cloudinaryService.deleteContent(found.getContentPublicId(), found.getContentType());
            found.setContentPublicId(null);
        }

        if (payload.content() == null || payload.content().isBlank()) {
            throw new BadRequestException("L'URL è obbligatorio.");
        }

        if (payload.title() != null) {
            found.setTitle(payload.title());
        }

        found.setContent(payload.content());

        found.setContentType(QrContentType.URL);

        QrCode qrCodeUpdated = qrCodesRepository.save(found);
        return toQrCodeResponseDTO(qrCodeUpdated);
    }

    public QrCodeResponseDTO updateMyQrCodeFile(Long qrId, UploadQrCodeDTO payload, MultipartFile file) {
        QrCode found = getMyQrEntity(qrId);

        if (payload.contentType() == QrContentType.URL) {
            throw new BadRequestException(
                    "Per convertire in URL utilizza l'endpoint dedicato."
            );
        }

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Il file è obbligatorio.");
        }


        if (payload.title() != null) {
            found.setTitle(payload.title());
        }

        //recupero il vecchio file da cloudinary, per poterlo eliminare dopo
        String oldContentPublicId = found.getContentPublicId();
        QrContentType oldContentType = found.getContentType();


        found.setContentType(payload.contentType());

        CloudinaryUploadResponseDTO contentUpload =
                cloudinaryService.uploadContent(
                        file,
                        payload.contentType()
                );

        found.setContentPublicId(contentUpload.publicId());
        found.setContent(contentUpload.secureUrl());
        QrCode qrCodeUpdated = qrCodesRepository.save(found);

        //cancello da cloudinary il vecchio file (lo faccio dopo aver salvato quello nuovo per sicurezza)
        if (oldContentPublicId != null
                && oldContentType != QrContentType.URL) {

            cloudinaryService.deleteContent(
                    oldContentPublicId,
                    oldContentType
            );
        }

        return toQrCodeResponseDTO(qrCodeUpdated);
    }

    public void deleteMyQrCode(Long qrId) {

        QrCode found = getMyQrEntity(qrId);

        if (found.getContentPublicId() != null) {

            cloudinaryService.deleteContent(
                    found.getContentPublicId(),
                    found.getContentType()
            );

        }

        cloudinaryService.deleteQrImage(
                found.getQrImagePublicId()
        );

        qrCodesRepository.delete(found);
    }

    public QrCodeResponseDTO assignCategory(
            Long qrId,
            Long categoryId
    ) {

        QrCode qrCode = getMyQrEntity(qrId);
        Category category = categoriesService.getMyCategoryEntity(categoryId);
        qrCode.setCategory(category);

        QrCode updatedQrCode = qrCodesRepository.save(qrCode);

        return toQrCodeResponseDTO(updatedQrCode);
    }

    public QrCodeResponseDTO disassignCategory(
            Long qrId
    ) {
        QrCode qrCode = getMyQrEntity(qrId);
        qrCode.setCategory(null);
        QrCode updatedQrCode = qrCodesRepository.save(qrCode);
        return toQrCodeResponseDTO(updatedQrCode);
    }

    public void deleteAllByUser(User user) {

        List<QrCode> qrCodes = qrCodesRepository.findByUser(user);

        for (QrCode qrCode : qrCodes) {

            if (qrCode.getQrImagePublicId() != null) {
                cloudinaryService.deleteQrImage(qrCode.getQrImagePublicId());
            }
        }

        qrCodesRepository.deleteAllByUser(user);
    }

}
