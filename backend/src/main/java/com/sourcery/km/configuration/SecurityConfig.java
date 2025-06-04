package com.sourcery.km.configuration;

import com.sourcery.km.configuration.filter.CustomAccessDeniedHandler;
import com.sourcery.km.configuration.filter.JwtAuthFilter;
import com.sourcery.km.configuration.filter.JwtAuthenticationEntryPoint;
import com.sourcery.km.configuration.properties.AzureProperties;
import com.sourcery.km.configuration.properties.JwtProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Base Spring security configuration for API restriction
 */
@Configuration
@EnableConfigurationProperties({JwtProperties.class, AzureProperties.class})
public class SecurityConfig {

    // Configuration for Spring JWT authentication logic
    @Bean
    @Order(1)
    public SecurityFilterChain jwtFilterChain(
            HttpSecurity http,
            JwtAuthFilter jwtAuthFilter,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            CustomAccessDeniedHandler customAccessDeniedHandler) throws Exception {
        return http
                .securityMatcher("/ws/**", "/sessions/find/**",
                        "/sessions/join", "/sessions/answer/**",
                        "/sessions/users", "/sessions/code")
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(
                                "/ws/**", "/sessions/find/**",
                                "/sessions/join", "/sessions/answer/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        exceptionHandling -> {
                            exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint);
                            exceptionHandling.accessDeniedHandler(customAccessDeniedHandler);
                        }
                )
                // CSRF does not allow anonymous posts methods which we use for /sessions/join
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }


    //Configuration for Auth0 authentication logic
    @Bean
    @Order(2)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/actuator/health").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(withDefaults())
                )
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:5173", "https://toohak.azurewebsites.net"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    // This makes sure that JwtAuthFilter is not applied everywhere
    @Bean
    public FilterRegistrationBean<JwtAuthFilter> registerFilter(JwtAuthFilter jwtAuthFilter) {
        FilterRegistrationBean<JwtAuthFilter> filterRegistrationBean = new FilterRegistrationBean<>(jwtAuthFilter);
        filterRegistrationBean.setEnabled(false);
        return filterRegistrationBean;
    }
}
