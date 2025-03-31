package com.UrbanFlow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import java.util.List;

@Configuration
public class TransitConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        // Add an interceptor to set a custom User-Agent header
        ClientHttpRequestInterceptor interceptor = (request, body, execution) -> {
            request.getHeaders().set("User-Agent", "Mozilla/5.0 (compatible; UrbanFlow/1.0)");
            request.getHeaders().set("Accept", "application/json");
            return execution.execute(request, body);
        };
        List<ClientHttpRequestInterceptor> interceptors = restTemplate.getInterceptors();
        interceptors.add(interceptor);
        restTemplate.setInterceptors(interceptors);
        return restTemplate;
    }
}
