package com.web.shinhan.model.service;

import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Store;
import com.web.shinhan.entity.User;
import com.web.shinhan.exception.VerifyDataException;
import com.web.shinhan.model.BlockUserDto;
import com.web.shinhan.model.PeerStatusDto;
import com.web.shinhan.model.TransactionDto;
import com.web.shinhan.model.VerityResult;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.StoreRepository;
import com.web.shinhan.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
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

  private UserRepository userRepository;
  private StoreRepository storeRepository;
  private PaymentRepository paymentRepository;

  @Autowired
  public void setUserRepository(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Autowired
  public void setStoreRepository(StoreRepository storeRepository) {
    this.storeRepository = storeRepository;
  }

  @Autowired
  public void setPaymentRepository(PaymentRepository paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

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

  public VerityResult<User> getUserVerityResult() throws Exception {
    List<User> userList = userRepository.findAll();
    List<User> failedList = new ArrayList<>();
    int total = userList.size();
    int verified = 0;

    for (User user : userList) {
      try {
        BlockUserDto blockUser = getUser(user.getEmail()).block();
        if (user.getBalance() != blockUser.getBalance()) {
          throw new VerifyDataException("User data validation failed.");
        }
        verified++;
      } catch (Exception e) {
        failedList.add(user);
      }
    }

    return new VerityResult<>(verified, total, failedList);
  }

  public VerityResult<Store> getStoreVerityResult() throws Exception {
    List<Store> storeList = storeRepository.findAll();
    List<Store> failedList = new ArrayList<>();
    int total = storeList.size();
    int verified = 0;

    for (Store store : storeList) {
      try {
        BlockUserDto blockStore = getUser(store.getEmail()).block();
        int dbBalance = store.getTotal() == null ? 0 : store.getTotal().intValue();
        int blockBalance = blockStore.getBalance().intValue();

        if (dbBalance != blockBalance) {
          throw new VerifyDataException("Store data validation failed.");
        }
        verified++;
      } catch (Exception e) {
        failedList.add(store);
      }
    }

    return new VerityResult<>(verified, total, failedList);
  }

  public VerityResult<Payment> getTransactionVerityResult() throws Exception {
    List<Payment> paymentList = paymentRepository.findAll();
    List<Payment> failedList = new ArrayList<>();
    int total = paymentList.size();
    int verified = 0;

    for (Payment payment : paymentList) {
      try {
        if (payment.getTransactionId() == null) {
          throw new VerifyDataException("transaction does not exist");
        }
        TransactionDto tx = getTransaction(payment.getTransactionId()).block();
        if (!payment.getUser().getEmail().equals(tx.getFrom()) ||
            !payment.getStore().getEmail().equals(tx.getTo()) ||
            payment.getTotal() != tx.getValue()
        ) {
          throw new VerifyDataException("Transaction data validation failed.");
        }
        verified++;
      } catch (Exception e) {
        failedList.add(payment);
      }
    }

    return new VerityResult<>(verified, total, failedList);
  }

  public Mono<PeerStatusDto[]> getPeersStatus() {
    return webClient.get()
        .uri("/health-check")
        .retrieve()
        .bodyToMono(PeerStatusDto[].class);
  }
}
