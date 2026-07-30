package bettapcq.bloodyglyph.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerOpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("BloodyGlyph API")
                        .version("1.0.0")
                        .description("""
                                REST API per BloodyGlyph.

                                BloodyGlyph è una piattaforma che permette agli utenti
                                di creare e gestire QR Code in modo semplice e organizzato.
                                """));
    }
}