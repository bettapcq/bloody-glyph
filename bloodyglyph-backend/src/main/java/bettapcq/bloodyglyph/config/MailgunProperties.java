package bettapcq.bloodyglyph.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

//serve per mantenere tutte le values in un unico posto

@ConfigurationProperties(prefix = "mailgun")
public class MailgunProperties {

    private String apiKey;
    private String domain;
    private String from;
    private String bannerUrl;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }
}