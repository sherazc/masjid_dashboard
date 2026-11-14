package com.sc.mdb.configuration;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.spec.SecretKeySpec;

@Configuration
public class SecurityConfiguration {

  @Value("${jwt.key}")
  private String jwtKey;

  @Bean
  public JwtEncoder jwtEncoder() {
    byte[] jwtKeyBytes = jwtKey.getBytes();
    return new NimbusJwtEncoder(new ImmutableSecret<>(jwtKeyBytes));
  }

  @Bean
  public JwtDecoder jwtDecoder() {
    byte[] jwtKeyBytes = jwtKey.getBytes();
    SecretKeySpec secretKeySpec = new SecretKeySpec(jwtKeyBytes, "HmacSHA512");
    return NimbusJwtDecoder.withSecretKey(secretKeySpec)
        .macAlgorithm(MacAlgorithm.HS512)
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
