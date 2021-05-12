package com.web.shinhan.model.service;

import com.web.shinhan.model.BlockUserDto;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.Charset;

@Service
public class BlockchainService {

  @Value("${fabric.url}")
  private String fabricUrl;
  private WebClient webClient;

  @PostConstruct
  public void init() {
    webClient = WebClient.builder()
        .baseUrl(fabricUrl)
        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .build();
  }

  public BlockUserDto gerUser(String userId) {
    BlockUserDto rs = webClient.get()
        .uri("/user/{userId}", userId)
        .retrieve()
        .bodyToMono(BlockUserDto.class)
        .block();
    return rs;
  }

  public BlockUserDto createUser(BlockUserDto user) {
    BlockUserDto rs = webClient.post()
        .uri("/user")
        .bodyValue(user)
        .retrieve()
        .bodyToMono(BlockUserDto.class)
        .block();
    return rs;
  }
}
