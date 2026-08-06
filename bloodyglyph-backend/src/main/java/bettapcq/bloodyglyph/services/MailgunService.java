package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.config.MailgunProperties;
import bettapcq.bloodyglyph.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
public class MailgunService {

    private final RestClient restClient = RestClient.create();

    private final MailgunProperties mailgunProperties;

    public MailgunService(MailgunProperties mailgunProperties) {
        this.mailgunProperties = mailgunProperties;
    }

    // Metodo che invia un'email tramite le API REST di Mailgun
    private void sendEmail(
            String to,
            String subject,
            String text
    ) {

        try {
            // Costruisce l'endpoint di Mailgun
            String url =
                    "https://api.mailgun.net/v3/"
                            + mailgunProperties.getDomain()
                            + "/messages";

            // Crea il body della richiesta nel formato application/x-www-form-urlencoded richiesto da Mailgun
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

            // aggiunge al body mittente, destinatario, oggetto e testo dell' email
            body.add("from", mailgunProperties.getFrom());
            body.add("to", to);
            body.add("subject", subject);
            body.add("text", text);

            // Effettua una richiesta HTTP POST verso Mailgun
            restClient.post()
                    //Inserimento endpoint
                    .uri(url)
                    // Autenticazione richiesta da Mailgun: username = "api", password = API Key
                    .headers(headers -> {
                        headers.setBasicAuth(
                                "api",
                                mailgunProperties.getApiKey()
                        );
                    })
                    // Formato dei dati inviati
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    // Inserimento del body che ho costruito
                    .body(body)
                    // Invio della richiesta
                    .retrieve()
                    // Risposta senza contenuto, basta sapere se è andata a buon fine
                    .toBodilessEntity();

        } catch (Exception e) {
            log.error(
                    "Errore durante l'invio dell'email a: " + to,
                    e
            );
        }
    }

    public void sendRegistrationEmail(User recipient) {

        String subject = "Benvenuto su BloodyGlyph!";

        String text =
                "Ciao " + recipient.getUsername() + ",\n\n" +
                        "Il tuo account è stato creato con successo.\n\n" +
                        "Da questo momento puoi accedere a BloodyGlyph e iniziare a creare e gestire i tuoi QR Code personalizzati.\n\n" +
                        "Buon divertimento!\n\n" +
                        "Il team di BloodyGlyph";

        sendEmail(
                recipient.getEmail(),
                subject,
                text
        );
    }


}