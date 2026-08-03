package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.payloads.responses.CloudinaryUploadResponseDTO;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;

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
}
