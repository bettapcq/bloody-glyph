package bettapcq.bloodyglyph;

import bettapcq.bloodyglyph.config.MailgunProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(MailgunProperties.class)
public class BloodyglyphBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BloodyglyphBackendApplication.class, args);
    }

}
