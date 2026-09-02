package bettapcq.bloodyglyph.services;


import bettapcq.bloodyglyph.entities.Category;
import bettapcq.bloodyglyph.entities.QrCode;
import bettapcq.bloodyglyph.entities.QrContentType;
import bettapcq.bloodyglyph.entities.User;
import bettapcq.bloodyglyph.exceptions.BadRequestException;
import bettapcq.bloodyglyph.exceptions.NotFoundException;
import bettapcq.bloodyglyph.payloads.requests.NewQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UpdateQrCodeDTO;
import bettapcq.bloodyglyph.payloads.requests.UpdateQrCodeFileDTO;
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
                qrCode.getCategory() == null ? null : qrCode.getCategory().getName(),
                qrCode.getOriginalFileName()
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
                .originalFileName(file.getOriginalFilename())
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

    public QrCodeResponseDTO updateMyQrCode(
            Long qrId,
            UpdateQrCodeDTO payload
    ) {

        QrCode found = getMyQrEntity(qrId);

        if (payload.contentType() != QrContentType.URL) {
            throw new BadRequestException(
                    "Per convertire in immagini e PDF utilizza l'endpoint dedicato."
            );
        }

        // L'URL deve essere presente
        if (payload.content() == null || payload.content().isBlank()) {
            throw new BadRequestException("L'URL è obbligatorio.");
        }

        // Salvo i dati del vecchio contenuto prima di modificarli
        String oldContentPublicId = found.getContentPublicId();
        QrContentType oldContentType = found.getContentType();

        // Aggiorno titolo e contenuto
        found.setTitle(payload.title());
        found.setContent(payload.content());
        found.setContentType(QrContentType.URL);

        // Un URL non ha file associato
        found.setContentPublicId(null);
        found.setOriginalFileName(null);

        QrCode qrCodeUpdated = qrCodesRepository.save(found);

        // Se prima era IMAGE/PDF, elimino il vecchio file
        // dopo che il QR è stato aggiornato correttamente
        if (oldContentPublicId != null
                && oldContentType != QrContentType.URL) {

            cloudinaryService.deleteContent(
                    oldContentPublicId,
                    oldContentType
            );
        }

        return toQrCodeResponseDTO(qrCodeUpdated);
    }

    public QrCodeResponseDTO updateMyQrCodeFile(
            Long qrId,
            UpdateQrCodeFileDTO payload,
            MultipartFile file
    ) {

        QrCode found = getMyQrEntity(qrId);

        if (payload.contentType() == QrContentType.URL) {
            throw new BadRequestException(
                    "Per convertire in URL utilizza l'endpoint dedicato."
            );
        }

        // Controllo se stiamo passando IMAGE -> PDF oppure PDF -> IMAGE
        boolean contentTypeChanged =
                found.getContentType() != payload.contentType();

        // Se cambio tipo di contenuto, devo necessariamente fornire un nuovo file
        if (contentTypeChanged && (file == null || file.isEmpty())) {
            throw new BadRequestException(
                    "Devi selezionare un nuovo file quando cambi il tipo di contenuto."
            );
        }

        // Il titolo può essere modificato indipendentemente dal contenuto
        found.setTitle(payload.title());

        // Se è stato fornito un nuovo file, sostituisco il contenuto
        if (file != null && !file.isEmpty()) {

            // Salvo i dati del vecchio file prima di sovrascriverli
            String oldContentPublicId = found.getContentPublicId();
            QrContentType oldContentType = found.getContentType();

            // Carico il nuovo file su Cloudinary
            CloudinaryUploadResponseDTO contentUpload =
                    cloudinaryService.uploadContent(
                            file,
                            payload.contentType()
                    );

            // Aggiorno il QR con il nuovo contenuto
            found.setContentType(payload.contentType());
            found.setContentPublicId(contentUpload.publicId());
            found.setContent(contentUpload.secureUrl());
            found.setOriginalFileName(file.getOriginalFilename());

            // Elimino il vecchio file da Cloudinary
            // solo dopo che il nuovo upload è riuscito
            if (oldContentPublicId != null
                    && oldContentType != QrContentType.URL) {

                cloudinaryService.deleteContent(
                        oldContentPublicId,
                        oldContentType
                );
            }
        }

        QrCode qrCodeUpdated = qrCodesRepository.save(found);

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
