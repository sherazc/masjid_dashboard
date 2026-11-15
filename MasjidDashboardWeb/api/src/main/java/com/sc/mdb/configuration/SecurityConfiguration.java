package com.sc.mdb.configuration;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.AdviceMode;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
    prePostEnabled = true,
    jsr250Enabled = true,
    securedEnabled = false,
    mode = AdviceMode.PROXY
)
public class SecurityConfiguration {

  @Value("${jwt.key}")
  private String jwtKey;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    return http
        .cors(Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .headers(headerCustomizer
            -> headerCustomizer.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
        .authorizeHttpRequests(customizer -> customizer.anyRequest().permitAll())
        .sessionManagement(sessionCustomizer
            -> sessionCustomizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .oauth2ResourceServer(oauth2ResourceServerCustomizer
            -> oauth2ResourceServerCustomizer.jwt(jwtCustomizer
            -> jwtCustomizer.jwtAuthenticationConverter(getJwtAuthenticationConverter())))
        .httpBasic(Customizer.withDefaults())
        .build();
  }

  private Converter<Jwt, AbstractAuthenticationToken> getJwtAuthenticationConverter() {
    Converter<Jwt, Collection<GrantedAuthority>> jwtToGrantedAuthorities = jwt -> {
      List<String> roles = jwt.getClaimAsStringList("roles");
      if (roles == null) {
        return Collections.emptyList();
      } else {
        return roles.stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
      }
    };

    JwtAuthenticationConverter jwtToAuthenticationConverter = new JwtAuthenticationConverter();
    jwtToAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtToGrantedAuthorities);
    return jwtToAuthenticationConverter;
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    var corsConfiguration = new CorsConfiguration();

    corsConfiguration.setAllowedOriginPatterns(Collections.singletonList("*"));
    corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
    corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
    corsConfiguration.setAllowCredentials(true);
    corsConfiguration.applyPermitDefaultValues();
    corsConfiguration.addExposedHeader("Content-Disposition");

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }

  @Bean
  public JwtEncoder jwtEncoder() {
    byte[] jwtKeyBytes = jwtKey.getBytes(StandardCharsets.UTF_8);
    return new NimbusJwtEncoder(new ImmutableSecret<>(jwtKeyBytes));
  }

  @Bean
  public JwtDecoder jwtDecoder() {
    byte[] jwtKeyBytes = jwtKey.getBytes(StandardCharsets.UTF_8);
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
