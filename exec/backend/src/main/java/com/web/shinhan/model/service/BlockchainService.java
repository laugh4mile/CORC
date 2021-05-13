package com.web.shinhan.model.service;

import com.web.shinhan.model.BlockUserDto;
import com.web.shinhan.model.TransactionDto;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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

  public Mono<BlockUserDto> getUser(String userId) {
    return webClient.get()
        .uri("/user/{userId}", userId)
        .retrieve()
        .bodyToMono(BlockUserDto.class);
  }

  public Mono<BlockUserDto> createUser(BlockUserDto user) {
    return webClient.post()
        .uri("/user")
        .bodyValue(user)
        .retrieve()
        .bodyToMono(BlockUserDto.class);
  }

  public Mono<BlockUserDto> deleteUser(String userId) {
    return webClient.delete()
        .uri("/user/{userId}", userId)
        .retrieve()
        .bodyToMono(BlockUserDto.class);
  }

  public Mono<BlockUserDto> setBalance(BlockUserDto user) {
    return webClient.put()
        .uri("/balance")
        .bodyValue(user)
        .retrieve()
        .bodyToMono(BlockUserDto.class);
  }

  public Mono<TransactionDto> createTransaction(TransactionDto tx) {
    return webClient.post()
        .uri("/transfer")
        .bodyValue(tx)
        .retrieve()
        .bodyToMono(TransactionDto.class);
  }

  public Mono<TransactionDto> getTransaction(String txId) {
    return webClient.get()
        .uri("/transaction/{txId}", txId)
        .retrieve()
        .bodyToMono(TransactionDto.class);
  }
}
