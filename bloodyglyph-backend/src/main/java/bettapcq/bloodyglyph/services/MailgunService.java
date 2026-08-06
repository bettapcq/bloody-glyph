package bettapcq.bloodyglyph.services;

import bettapcq.bloodyglyph.config.MailgunProperties;
import bettapcq.bloodyglyph.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;


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
            String html
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
            body.add("html", html);

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

    //Metodo per leggere un template HTML dalla cartella resources/templates/email.
    private String loadTemplate(String templateName) {

        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(
                "templates/email/" + templateName)) {

            if (inputStream == null) {
                throw new IllegalArgumentException(
                        "Template email non trovato: " + templateName
                );
            }

            return new String(
                    inputStream.readAllBytes(),
                    StandardCharsets.UTF_8
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Errore durante la lettura del template email.",
                    e
            );

        }

    }

    public void sendRegistrationEmail(User recipient) {

        String subject = "Benvenutə su BloodyGlyph!";

        String html = loadTemplate("welcome.html");

        html = html.replace(
                "{{username}}",
                recipient.getUsername()
        );
        html = html.replace(
                "{{bannerUrl}}",
                mailgunProperties.getBannerUrl()
        );

        sendEmail(
                recipient.getEmail(),
                subject,
                html
        );
    }


    public void sendResetPasswordEmail(User recipient, String temporaryPassword) {

        String subject = "Reimpostazione della password";

        String html = loadTemplate("reset-password.html");

        html = html.replace(
                "{{username}}",
                recipient.getUsername()
        );

        html = html.replace(
                "{{temporaryPassword}}",
                temporaryPassword
        );

        html = html.replace(
                "{{bannerUrl}}",
                mailgunProperties.getBannerUrl()
        );

        sendEmail(
                recipient.getEmail(),
                subject,
                html
        );
    }

    public void sendPasswordChangedEmail(User recipient) {

        String subject = "Password aggiornata";

        String html = loadTemplate("password-changed.html");

        html = html.replace(
                "{{username}}",
                recipient.getUsername()
        );

        html = html.replace(
                "{{bannerUrl}}",
                mailgunProperties.getBannerUrl()
        );

        sendEmail(
                recipient.getEmail(),
                subject,
                html
        );
    }

    public void sendEmailChangedEmail(User recipient) {
        String subject = "Email aggiornata";

        String html = loadTemplate("email-changed.html");

        html = html.replace(
                "{{username}}",
                recipient.getUsername()
        );

        html = html.replace(
                "{{bannerUrl}}",
                mailgunProperties.getBannerUrl()
        );

        sendEmail(
                recipient.getEmail(),
                subject,
                html
        );
    }

}