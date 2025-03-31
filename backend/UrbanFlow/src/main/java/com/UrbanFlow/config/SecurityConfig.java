package com.UrbanFlow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API calls
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()  // Allow public access to authentication APIs
                        .requestMatchers("/api/transit/modes").permitAll()  // ✅ Allow public access to transit modes
                        .requestMatchers("/api/transit/**").permitAll()
                        .requestMatchers("/api/routes/**").permitAll()
                        .requestMatchers("/api/**").permitAll()

                        .anyRequest().authenticated()  // Protect all other endpoints
                )
                .httpBasic(Customizer.withDefaults()); // Enable basic authentication for protected endpoints

        return http.build();
    }
}
