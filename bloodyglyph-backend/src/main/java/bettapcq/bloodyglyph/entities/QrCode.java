package bettapcq.bloodyglyph.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Table(name = "qr_codes")
public class QrCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name = "qr_id")
    private Long qrId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    //immagine per il frontend
    @Column(name = "qr_image_url", nullable = false)
    private String qrImageUrl;

    //codice pubblico per il qrcode, così la scansione non porta direttamente al contenuto ma all'endpoint dedicato
    @Column(nullable = false, unique = true, updatable = false)
    private String publicCode;

    //id cloudinary dell'immagine per cancellarla o cambiarla
    @Column(name = "qr_image_public_id", nullable = false)
    private String qrImagePublicId;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type", nullable = false)
    private QrContentType contentType;

    // id per prendere da cloudinary il contenuto nel caso fosse un pdf o un'immagine
    @Column(name = "content_public_id")
    private String contentPublicId;

    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    // Con PrePersist: Creo l'oggetto -> repository.save(qr)-> @PrePersist -> createdAt = LocalDateTime.now() -> INSERT nel database (senza che lo creo io ogni volta)
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
