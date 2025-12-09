package com.example.todo.todoproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@Configuration
// "If you don't want to change all your existing controllers to add the mapping step to return PagedModel instead of
// Page you can enable the automatic translation of PageImpl instances into PagedModel by tweaking
// @EnableSpringDataWebSupport"
// Referência: https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html#core.web.page.config
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class AppConfiguration implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
