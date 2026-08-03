package bettapcq.bloodyglyph.security;

import bettapcq.bloodyglyph.entities.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Component
public class JWTTools {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationms}")
    private long expirationms;

    // metodo per creare la firma SecretKey
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    //metodo per generare il token
    public String generateToken(User user) {

        Date now = new Date();

        Date expirationDate = new Date(now.getTime() + expirationms);


        return Jwts.builder() //costruisce il token
                .subject(String.valueOf(user.getUserId())) //soggetto: in questo caso l'id dell'utente
                .issuedAt(now) //data emissione
                .expiration(expirationDate) // scadenza
                .signWith(getSigningKey()) // firma SecretKey
                .compact(); //unisce tutti i dati
    }

    //metodo per verificare che il token sia valido ed estrarre l'id dell'utente dal token
    public String extractSubject(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey()) //verifica con la SecretKey
                .build()
                .parseSignedClaims(token) //check incongruenze nel token , se non ci sono prosegue
                .getPayload() // prende il payload
                .getSubject(); // dal payload estrae l'id
    }

}