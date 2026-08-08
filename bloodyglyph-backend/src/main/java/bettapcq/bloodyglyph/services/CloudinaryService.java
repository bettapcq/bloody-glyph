package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.entities.QrContentType;
import bettapcq.bloodyglyph.payloads.responses.CloudinaryUploadResponseDTO;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public CloudinaryUploadResponseDTO uploadQrImage(byte[] qrImage) {

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    qrImage,
                    ObjectUtils.asMap(
                            "folder", "bloodyglyph/qr-codes",
                            "resource_type", "image"
                    )
            );

            return new CloudinaryUploadResponseDTO(
                    result.get("public_id").toString(),
                    result.get("secure_url").toString()
            );
        } catch (IOException exception) {
            throw new RuntimeException(
                    "Errore durante il caricamento del QR code su Cloudinary",
                    exception
            );
        }
    }


    public CloudinaryUploadResponseDTO uploadContent(
            MultipartFile file,
            QrContentType contentType
    ) {
        try {
            String folder;
            String resourceType;

            switch (contentType) {
                case IMAGE -> {
                    folder = "bloodyglyph/content/images";
                    resourceType = "image";
                }

                case PDF -> {
                    folder = "bloodyglyph/content/pdfs";
                    resourceType = "image";
                }

                default -> throw new IllegalArgumentException(
                        "Tipo di contenuto non supportato per l'upload."
                );
            }

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", folder,
                            "resource_type", resourceType
                    )
            );

            return new CloudinaryUploadResponseDTO(
                    result.get("public_id").toString(),
                    result.get("secure_url").toString()
            );

        } catch (IOException exception) {
            throw new RuntimeException(
                    "Errore durante il caricamento del contenuto su Cloudinary",
                    exception
            );
        }
    }


    // elimina l'immagine qr da Cloudinary
    public void deleteQrImage(String publicId) {
        try {
            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type", "image"
                    )
            );
        } catch (IOException exception) {
            throw new RuntimeException(
                    "Errore durante l'eliminazione del QR code da Cloudinary",
                    exception
            );
        }
    }


    // Elimina il file (pdf o image) salvato su Cloudinary
    public void deleteContent(
            String publicId,
            QrContentType contentType
    ) {

        try {

            String resourceType = switch (contentType) {
                case IMAGE, PDF -> "image";
                default -> throw new IllegalArgumentException(
                        "Tipo di contenuto non supportato."
                );
            };

            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type", resourceType
                    )
            );

        } catch (IOException exception) {

            throw new RuntimeException(
                    "Errore durante l'eliminazione del contenuto da Cloudinary",
                    exception
            );
        }
    }
}
