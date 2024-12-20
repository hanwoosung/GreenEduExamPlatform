package org.green.hckh.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://192.168.0.224:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors().configurationSource(corsConfigurationSource()) // CORS 설정 적용
                .and()
                .formLogin(form -> form
                        .loginPage("/LoginForm")
                        .loginProcessingUrl("/loginProc")
                        .usernameParameter("userId")
                        .passwordParameter("userPassword")
                        .defaultSuccessUrl("/api/v1/loginResult")
                        .failureUrl("/api/v1/loginResult")
                        .permitAll()
                );

        http
                .logout((auth) -> auth
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/api/v1/logoutResult")
                        .deleteCookies("JSESSIONID")
                );

        http
                .authorizeHttpRequests(auth -> auth

//                        .requestMatchers(
//                                "/api/v1/**" // 인증 필요한 엔드포인트
//                        ).authenticated()

                        .anyRequest().permitAll() // 그 외는 허용
                );

        http
                .csrf(csrf -> csrf.disable());

        http
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 기본값: 세션 필요 시 생성
                );

        return http.build();
    }
}