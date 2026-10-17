package devpilot.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;

@Configuration
public class EncryptionConfig {

    @Bean
    public TextEncryptor tokenEncryptor(
            @Value("${app.security.encryption-key}") String encryptionKey,
            @Value("${app.security.encryption-salt}") String encryptionSalt) {
        return Encryptors.delux(encryptionKey, encryptionSalt);
    }
}
