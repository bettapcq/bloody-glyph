package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.exceptions.NotFoundException;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;


// CREAZIONE DEL QR CODE PERSONALIZZATO CON ZXING E GRAPHICS2D

@Service
public class QrImagesService {

    // Dimensione finale dell'immagine PNG.
    private static final int QR_SIZE = 800;

    // Spazio vuoto lasciato intorno al QR Code.
    // Il margine viene gestito manualmente durante il rendering,
    // invece di essere incluso direttamente nella BitMatrix di ZXing.
    private static final int QR_PADDING = 40;

    // Colore dello sfondo.
    private static final Color BACKGROUND_COLOR =
            new Color(244, 239, 225);

    // Colore principale dei moduli del QR Code.
    private static final Color MODULE_COLOR =
            new Color(18, 18, 18);

    // Colore che useremo successivamente per gli occhi personalizzati.
    private static final Color ACCENT_COLOR =
            new Color(120, 0, 0);


    // Metodo principale:
    // riceve il contenuto da inserire nel QR Code
    // e restituisce l'immagine PNG sotto forma di byte[].
    public byte[] generateQrImage(String content) {

        // Crea la matrice logica del QR Code.
        BitMatrix bitMatrix = createBitMatrix(content);

        // Crea una tela vuota da 800 x 800 pixel.
        BufferedImage image = createCanvas();

        // Crea l'oggetto che useremo per disegnare sull'immagine.
        Graphics2D graphics = image.createGraphics();

        try {
            // Configura la qualità del rendering.
            configureGraphics(graphics);

            // Disegna lo sfondo avorio.
            drawBackground(graphics);

            // Disegna i moduli attivi del QR come pallini neri.
            drawModules(graphics, bitMatrix);

            // Disegna i tre finder pattern personalizzati.
            drawFinderPatterns(graphics, bitMatrix);

            drawCenterLogo(graphics);

        } finally {
            // Libera sempre le risorse grafiche,
            // anche se durante il rendering si verifica un errore.
            graphics.dispose();
        }

        // Converte l'immagine finale in un array di byte PNG.
        return toByteArray(image);
    }


    // Crea la BitMatrix tramite ZXing.
    // La BitMatrix è una griglia logica:
    // true  = modulo attivo
    // false = modulo inattivo
    //
    // Non contiene ancora pallini, colori o immagini:
    // l'aspetto grafico verrà gestito successivamente con Graphics2D.
    private BitMatrix createBitMatrix(String content) {

        try {
            Map<EncodeHintType, Object> hints = new HashMap<>();

            // Livello alto di correzione degli errori.
            // Sarà utile quando inseriremo il logo centrale,
            // perché una parte dei moduli verrà coperta.
            hints.put(
                    EncodeHintType.ERROR_CORRECTION,
                    ErrorCorrectionLevel.H
            );

            // Non facciamo gestire il margine a ZXing.
            // Lo gestiamo manualmente tramite QR_PADDING,
            // così abbiamo più controllo sul layout finale.
            hints.put(
                    EncodeHintType.MARGIN,
                    0
            );

            QRCodeWriter qrCodeWriter = new QRCodeWriter();

            return qrCodeWriter.encode(
                    content,
                    BarcodeFormat.QR_CODE,
                    0,
                    0,
                    hints
            );

        } catch (WriterException e) {
            throw new RuntimeException(
                    "Errore durante la creazione della matrice del QR Code",
                    e
            );
        }
    }


    // Crea una nuova immagine vuota con supporto alla trasparenza.
    private BufferedImage createCanvas() {
        return new BufferedImage(
                QR_SIZE,
                QR_SIZE,
                BufferedImage.TYPE_INT_ARGB
        );
    }


    // Configura Graphics2D per ottenere bordi più morbidi
    // e una qualità migliore nel disegno dei pallini.
    private void configureGraphics(Graphics2D graphics) {

        graphics.setRenderingHint(
                RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON
        );

        graphics.setRenderingHint(
                RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY
        );
    }


    // Riempie tutta l'immagine con il colore di sfondo.
    private void drawBackground(Graphics2D graphics) {

        graphics.setColor(BACKGROUND_COLOR);

        graphics.fillRect(
                0,
                0,
                QR_SIZE,
                QR_SIZE
        );
    }

    // Controlla se una coordinata della BitMatrix appartiene a uno dei tre finder pattern, cioè gli "occhi" del QR Code.
    // Ogni finder pattern occupa un'area logica di 7 x 7 moduli.
    private boolean isFinderPatternArea(
            int x,
            int y,
            int matrixWidth,
            int matrixHeight
    ) {

        // Occhio in alto a sinistra.
        boolean topLeft =
                x < 7 && y < 7;

        // Occhio in alto a destra.
        boolean topRight =
                x >= matrixWidth - 7 && y < 7;

        // Occhio in basso a sinistra.
        boolean bottomLeft =
                x < 7 && y >= matrixHeight - 7;

        return topLeft || topRight || bottomLeft;
    }

    // Disegna tutti i moduli attivi della BitMatrix come pallini.
    private void drawModules(
            Graphics2D graphics,
            BitMatrix bitMatrix
    ) {

        graphics.setColor(MODULE_COLOR);

        int matrixWidth = bitMatrix.getWidth();
        int matrixHeight = bitMatrix.getHeight();

        // Calcola lo spazio realmente disponibile dopo aver tolto il padding.
        int availableSize = QR_SIZE - (QR_PADDING * 2);

        // Calcola la dimensione in pixel di ogni singolo modulo.
        // Uso Math.min per mantenere il QR perfettamente quadrato.
        int moduleSize = Math.min(
                availableSize / matrixWidth,
                availableSize / matrixHeight
        );

        // Dimensioni effettive del QR renderizzato.
        int renderedWidth = matrixWidth * moduleSize;
        int renderedHeight = matrixHeight * moduleSize;

        // Calcola gli offset necessari per centrare il QR nell'immagine.
        int offsetX = (QR_SIZE - renderedWidth) / 2;
        int offsetY = (QR_SIZE - renderedHeight) / 2;

        // Scorre tutte le celle della BitMatrix.
        for (int y = 0; y < matrixHeight; y++) {
            for (int x = 0; x < matrixWidth; x++) {

                // Disegna soltanto i moduli attivi che non appartengono alle aree riservate ai finder pattern.
                if (
                        bitMatrix.get(x, y)
                                && !isFinderPatternArea(
                                x,
                                y,
                                matrixWidth,
                                matrixHeight
                        )
                ) {

                    int pixelX = offsetX + (x * moduleSize);
                    int pixelY = offsetY + (y * moduleSize);

                    graphics.fillOval(
                            pixelX,
                            pixelY,
                            moduleSize,
                            moduleSize
                    );
                }
            }
        }
    }

    private void drawFinderPatterns(
            Graphics2D graphics,
            BitMatrix bitMatrix
    ) {

        int matrixWidth = bitMatrix.getWidth();
        int matrixHeight = bitMatrix.getHeight();

        int availableSize = QR_SIZE - (QR_PADDING * 2);

        int moduleSize = Math.min(
                availableSize / matrixWidth,
                availableSize / matrixHeight
        );

        int renderedWidth = matrixWidth * moduleSize;
        int renderedHeight = matrixHeight * moduleSize;

        int offsetX = (QR_SIZE - renderedWidth) / 2;
        int offsetY = (QR_SIZE - renderedHeight) / 2;

        // Occhio in alto a sinistra.
        drawFinderPattern(
                graphics,
                offsetX,
                offsetY,
                moduleSize
        );

        // Occhio in alto a destra.
        drawFinderPattern(
                graphics,
                offsetX + ((matrixWidth - 7) * moduleSize),
                offsetY,
                moduleSize
        );

        // Occhio in basso a sinistra.
        drawFinderPattern(
                graphics,
                offsetX,
                offsetY + ((matrixHeight - 7) * moduleSize),
                moduleSize
        );
    }

    // Disegna un singolo finder pattern nell'area equivalente a 7 x 7 moduli della matrice.
    private void drawFinderPattern(
            Graphics2D graphics,
            int startX,
            int startY,
            int moduleSize
    ) {

        int outerSize = 7 * moduleSize;
        int innerSize = 5 * moduleSize;
        int centerSize = 3 * moduleSize;

        // Disegna la cornice esterna nera.
        graphics.setColor(MODULE_COLOR);

        graphics.fillRoundRect(
                startX,
                startY,
                outerSize,
                outerSize,
                moduleSize,
                moduleSize
        );

        // Disegna l'area interna avorio.
        int innerX = startX + moduleSize;
        int innerY = startY + moduleSize;

        graphics.setColor(BACKGROUND_COLOR);

        graphics.fillRoundRect(
                innerX,
                innerY,
                innerSize,
                innerSize,
                moduleSize,
                moduleSize
        );

        // Calcola il centro dell'occhio.
        int centerX = startX + (outerSize / 2);
        int centerY = startY + (outerSize / 2);

        // Disegna il rombo nero esterno.
        Polygon outerDiamond = createDiamond(
                centerX,
                centerY,
                centerSize
        );

        graphics.setColor(MODULE_COLOR);
        graphics.fillPolygon(outerDiamond);

        // Disegna il rombo avorio intermedio.
        Polygon middleDiamond = createDiamond(
                centerX,
                centerY,
                (int) (centerSize * 0.60)
        );

        graphics.setColor(BACKGROUND_COLOR);
        graphics.fillPolygon(middleDiamond);

        // Disegna il rombo rosso centrale.
        Polygon innerDiamond = createDiamond(
                centerX,
                centerY,
                (int) (centerSize * 0.30)
        );

        graphics.setColor(ACCENT_COLOR);
        graphics.fillPolygon(innerDiamond);
    }

    // Crea un rombo centrato nelle coordinate indicate.
    // size rappresenta la larghezza e l'altezza complessive del rombo.
    private Polygon createDiamond(
            int centerX,
            int centerY,
            int size
    ) {

        int halfSize = size / 2;

        Polygon diamond = new Polygon();

        // Punto superiore.
        diamond.addPoint(
                centerX,
                centerY - halfSize
        );

        // Punto destro.
        diamond.addPoint(
                centerX + halfSize,
                centerY
        );

        // Punto inferiore.
        diamond.addPoint(
                centerX,
                centerY + halfSize
        );

        // Punto sinistro.
        diamond.addPoint(
                centerX - halfSize,
                centerY
        );

        return diamond;
    }


    // Carica il logo BloodyGlyph dalle risorse e lo disegna al centro del QR Code.
    private void drawCenterLogo(Graphics2D graphics) {

        try (InputStream logoStream =
                     getClass().getResourceAsStream(
                             "/images/bg-logo.png"
                     )) {

            if (logoStream == null) {
                throw new NotFoundException(
                        "Logo BloodyGlyph non trovato nelle risorse."
                );
            }

            BufferedImage logo = ImageIO.read(logoStream);

            int maxLogoSize = (int) (QR_SIZE * 0.20);

            int originalWidth = logo.getWidth();
            int originalHeight = logo.getHeight();

            double scale = Math.min(
                    (double) maxLogoSize / originalWidth,
                    (double) maxLogoSize / originalHeight
            );

            int logoWidth = (int) (originalWidth * scale);
            int logoHeight = (int) (originalHeight * scale);

            int logoX = (QR_SIZE - logoWidth) / 2;
            int logoY = (QR_SIZE - logoHeight) / 2;

            int backgroundPadding = 8;

            int backgroundSize =
                    Math.max(logoWidth, logoHeight)
                            + (backgroundPadding * 2);

            int backgroundX = (QR_SIZE - backgroundSize) / 2;
            int backgroundY = (QR_SIZE - backgroundSize) / 2;

            graphics.setColor(BACKGROUND_COLOR);

            graphics.fillOval(
                    backgroundX,
                    backgroundY,
                    backgroundSize,
                    backgroundSize
            );

            graphics.drawImage(
                    logo,
                    logoX,
                    logoY,
                    logoWidth,
                    logoHeight,
                    null
            );

        } catch (IOException e) {
            throw new RuntimeException(
                    "Errore durante il caricamento del logo BloodyGlyph",
                    e
            );
        }
    }

    // Converte il BufferedImage in un file PNG mantenuto in memoria.
    // Il risultato sarà poi utilizzabile per l'upload su Cloudinary.
    private byte[] toByteArray(BufferedImage image) {

        try {
            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            ImageIO.write(
                    image,
                    "png",
                    outputStream
            );

            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException(
                    "Errore durante la conversione del QR Code in PNG",
                    e
            );
        }
    }
}