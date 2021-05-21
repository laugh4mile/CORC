package com.web.shinhan.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.web.shinhan.entity.Payment;
import com.web.shinhan.entity.Store;
import com.web.shinhan.entity.User;
import com.web.shinhan.model.BlockUserDto;
import com.web.shinhan.model.PaymentDto;
import com.web.shinhan.model.PaymentDto.Status;
import com.web.shinhan.model.PaymentitemDto;
import com.web.shinhan.model.TransactionDto;
import com.web.shinhan.model.UserDto;
import com.web.shinhan.model.mapper.PaymentMapper;
import com.web.shinhan.repository.PaymentRepository;
import com.web.shinhan.repository.StoreRepository;
import com.web.shinhan.repository.UserRepository;
import reactor.core.publisher.Mono;

@Service
public class PaymentService {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  private PaymentRepository paymentRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private StoreRepository storeRepository;

  @Autowired
  private BlockchainService blockchainService;

  @Autowired
  private UserService userService;

  @Autowired
  private PaymentitemService paymentitemService;

  private final PaymentMapper mapper = Mappers.getMapper(PaymentMapper.class);

  @Transactional
  public Page<PaymentDto> findUserPayment(int userId, Pageable pageable) {
    Page<Payment> payments = paymentRepository.findAllByUserId(userId, pageable);
    return payments.map(payment -> {
      PaymentDto tx = PaymentDto.of(payment);
      verifyBlockTransaction(tx);
      return tx;
    });
  }

  @Transactional
  public Page<PaymentDto> findAll(Pageable pageable) {
    Page<Payment> payments = paymentRepository.findAll(pageable);
    return payments.map(payment -> {
      PaymentDto tx = PaymentDto.of(payment);
      verifyBlockTransaction(tx);
      return tx;
    });
  }

  @Transactional
  public boolean confirmPayment(int storeId) {
    List<Payment> payments = paymentRepository.findByStoreId(storeId);
    int balance = 0;
    for (Payment py : payments) {
      if (py.getStatus() == Status.CREATED) {
        PaymentDto paymentDto = mapper.INSTANCE.paymentToDto(py);
        paymentDto.setStatus(Status.ALLOWED);
        balance += paymentDto.getTotal();
        paymentRepository.save(paymentDto.toEntity());
      } else if (py.getStatus() == Status.ALLOWED || py.getStatus() == Status.DENIEND) {
        continue;
      }
    }

    try {
      Store store = storeRepository.findByStoreId(storeId);
      BlockUserDto blockStore = blockchainService.getUser(store.getEmail()).block();
      blockStore.setBalance(blockStore.getBalance() - balance);
      blockchainService.setBalance(blockStore).subscribe();
      return true;
    } catch (Exception e) {
      return false;
    }

  }

  @Transactional
  public Page<PaymentDto> findStorePayment(int storeId, Pageable pageable) {
    Page<Payment> payments = paymentRepository.findAllByStoreId(storeId, pageable);
    return payments.map(payment -> {
      PaymentDto tx = PaymentDto.of(payment);
      verifyBlockTransaction(tx);
      return tx;
    });
  }

  public int findStoreTotal() {
    int total = 0;
    List<Integer> used = paymentRepository.calcTotalExpense();
    for (int nc : used) {
      total += nc;
    }
    return total;
  }

  @Transactional
  public List<PaymentDto> findAllByStatus() {
    List<Payment> payments = paymentRepository.findAllByStatus();
    List<PaymentDto> paymentDto = new ArrayList<>();
    for (Payment payment : payments) {
      PaymentDto dto = mapper.INSTANCE.paymentToDto(payment);
      paymentDto.add(dto);
    }
    return paymentDto;
  }

  public int calcTotalExpense() {
    int total = 0;
    List<Integer> used = paymentRepository.calcTotalExpense();
    for (int nc : used) {
      total += nc;
    }
    return total;
  }

  public int notConfirmed() {
    int total = 0;
    List<Integer> notConfirmed = paymentRepository.findTotalByStatus();
    for (int nc : notConfirmed) {
      total += nc;
    }
    return total;
  }

  public int expenseByYear(int now, int year) {
    int monthly = 0;

    if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
      LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
      LocalDateTime endDate = LocalDateTime.of(year, now, 31, 23, 59);
      List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
      for (int payment : payments) {
        monthly += payment;
      }
    } else if (now == 4 || now == 6 || now == 9 || now == 11) {
      LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
      LocalDateTime endDate = LocalDateTime.of(year, now, 30, 23, 59);
      List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
      for (int payment : payments) {
        monthly += payment;
      }
    } else {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, 29, 23, 59);
        List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
        for (int payment : payments) {
          monthly += payment;
        }
      } else {
        LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, 28, 23, 59);
        List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
        for (int payment : payments) {
          monthly += payment;
        }
      }
    }
    return monthly;
  }

  public int confirmedByYear(int now, int year) {
    int monthly = 0;

    if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
      LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
      LocalDateTime endDate = LocalDateTime.of(year, now, 31, 23, 59);
      List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
      for (int payment : payments) {
        monthly += payment;
      }
    } else if (now == 4 || now == 6 || now == 9 || now == 11) {
      LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
      LocalDateTime endDate = LocalDateTime.of(year, now, 30, 23, 59);
      List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
      for (int payment : payments) {
        monthly += payment;
      }
    } else {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, 29, 23, 59);
        List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
        for (int payment : payments) {
          monthly += payment;
        }
      } else {
        LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, 28, 23, 59);
        List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
        for (int payment : payments) {
          monthly += payment;
        }
      }
    }
    return monthly;
  }

  public List<Integer> expenseByMonth(int now, int year) {
    List<Integer> month = new ArrayList<>();
    if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
      for (int i = 1; i <= 31; i++) {
        int daily = 0;
        LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
        List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
        for (int payment : payments) {
          daily += payment;
        }
        month.add(daily);
      }
    } else if (now == 4 || now == 6 || now == 9 || now == 11) {
      for (int i = 1; i <= 30; i++) {
        int daily = 0;
        LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
        List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
        for (int payment : payments) {
          daily += payment;
        }
        month.add(daily);
      }
    } else {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        for (int i = 1; i <= 29; i++) {
          int daily = 0;
          LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
          LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
          List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
          for (int payment : payments) {
            daily += payment;
          }
          month.add(daily);
        }
      } else {
        for (int i = 1; i <= 28; i++) {
          int daily = 0;
          LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
          LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
          List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
          for (int payment : payments) {
            daily += payment;
          }
          month.add(daily);
        }
      }
    }
    return month;
  }

  public List<Integer> confirmedByMonth(int now, int year) {
    List<Integer> month = new ArrayList<>();
    if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
      for (int i = 1; i <= 31; i++) {
        int daily = 0;
        LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
        List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
        for (int payment : payments) {
          daily += payment;
        }
        month.add(daily);
      }
    } else if (now == 4 || now == 6 || now == 9 || now == 11) {
      for (int i = 1; i <= 30; i++) {
        int daily = 0;
        LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
        List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
        for (int payment : payments) {
          daily += payment;
        }
        month.add(daily);
      }
    } else {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        for (int i = 1; i <= 29; i++) {
          int daily = 0;
          LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
          LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
          List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
          for (int payment : payments) {
            daily += payment;
          }
          month.add(daily);
        }
      } else {
        for (int i = 1; i <= 28; i++) {
          int daily = 0;
          LocalDateTime startDate = LocalDateTime.of(year, now, i, 00, 00);
          LocalDateTime endDate = LocalDateTime.of(year, now, i, 23, 59);
          List<Integer> payments = paymentRepository.confirmedByMonth(startDate, endDate);
          for (int payment : payments) {
            daily += payment;
          }
          month.add(daily);
        }
      }
    }
    return month;
  }

  public int findTotal(int storeId) {
    int total = 0;
    LocalDate now = LocalDate.now();
    LocalDateTime startDate = LocalDateTime.of(now.getYear(), now.getMonth(), 1, 0, 0);
    LocalDateTime endDate =
        LocalDateTime.of(now.getYear(), now.getMonth(), now.lengthOfMonth(), 23, 59, 59);
    List<Integer> totalUsed = paymentRepository.findTotalByStoreId(storeId, startDate, endDate);
    for (int nc : totalUsed) {
      total += nc;
    }
    return total;
  }

  public int findNotConfirmed(int storeId) {
    int total = 0;
    List<Integer> notConfirmed = paymentRepository.findNotConfirmedByStoreId(storeId);
    for (int nc : notConfirmed) {
      total += nc;
    }
    return total;
  }

  public int findUserPaymentCustom(int now, int year) {
    int monthly = 0;

    if (now == 1 || now == 3 || now == 5 || now == 7 || now == 8 || now == 10 || now == 12) {
      LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
      LocalDateTime endDate = LocalDateTime.of(year, now, 31, 23, 59);
      List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
      for (int payment : payments) {
        monthly += payment;
      }
    } else if (now == 4 || now == 6 || now == 9 || now == 11) {
      LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
      LocalDateTime endDate = LocalDateTime.of(year, now, 30, 23, 59);
      List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
      for (int payment : payments) {
        monthly += payment;
      }
    } else {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, 29, 23, 59);
        List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
        for (int payment : payments) {
          monthly += payment;
        }
      } else {
        LocalDateTime startDate = LocalDateTime.of(year, now, 01, 00, 00);
        LocalDateTime endDate = LocalDateTime.of(year, now, 28, 23, 59);
        List<Integer> payments = paymentRepository.findAllByMonth(startDate, endDate);
        for (int payment : payments) {
          monthly += payment;
        }
      }
    }
    return monthly;
  }

  public Page<PaymentDto> findUserPaymentCustom(int userId, Pageable pageable, int startDate,
      int endDate) {
    int startYear = startDate / 10000;
    int startMonth = (startDate - startYear * 10000) / 100;
    int startDay = (startDate - startYear * 10000) % 100;
    int endYear = endDate / 10000;
    int endMonth = (endDate - endYear * 10000) / 100;
    int endDay = (endDate - endYear * 10000) % 100;
    LocalDateTime startDateIn = LocalDateTime.of(startYear, startMonth, startDay, 00, 00);
    LocalDateTime endDateIn = LocalDateTime.of(endYear, endMonth, endDay, 23, 59);
    Page<Payment> payments =
        paymentRepository.findAllByCustom(userId, pageable, startDateIn, endDateIn);
    return payments.map(PaymentDto::of);
  }

  public void pay(int userId, int storeId, int bill, List<PaymentitemDto> paymentitems) {
    PaymentDto paymentDto = new PaymentDto();
    paymentDto.setDate(LocalDateTime.now());
    paymentDto.setUserId(userId);
    paymentDto.setStoreId(storeId);
    paymentDto.setTotal(bill);
    paymentDto.setStatus(Status.CREATED);
    Payment payment = paymentDto.toEntity();
    paymentRepository.save(payment);

    for (int i = 0; i < paymentitems.size(); i++) {
      paymentitemService.registPaymentitem(paymentitems.get(i).getProductName(),
          paymentitems.get(i).getPrice(), paymentitems.get(i).getAmount(), payment.getPaymentId());
    }

    // 블록체인 삽입
    // ISSUE: transaction이 생성되기 직전에 user의 balance가 수정되어 WorldState 데이터 접근 불가
    createBlockTransaction(PaymentDto.of(payment));
  }

  public PaymentDto findLastPayment() {
    Payment payment = paymentRepository.findTop1ByOrderByPaymentIdDesc();
    PaymentDto dto = mapper.INSTANCE.paymentToDto(payment);
    return dto;
  }

  public PaymentDto findPayment(int paymentId) {
    Payment paymentEN = paymentRepository.findByPaymentId(paymentId);
    PaymentDto dto = mapper.INSTANCE.paymentToDto(paymentEN);
    return dto;
  }

  public List<Integer[]> calcNotConfirmed() {
    List<Integer[]> notConfirmed = paymentRepository.findTotalByStatusandStoreId();
    return notConfirmed;
  }

  public Page<PaymentDto> findStorePaymentCustom(int storeId, Pageable pageable, int startDate,
      int endDate) {
    int startYear = startDate / 10000;
    int startMonth = (startDate - startYear * 10000) / 100;
    int startDay = (startDate - startYear * 10000) % 100;
    int endYear = endDate / 10000;
    int endMonth = (endDate - endYear * 10000) / 100;
    int endDay = (endDate - endYear * 10000) % 100;
    LocalDateTime startDateIn = LocalDateTime.of(startYear, startMonth, startDay, 00, 00, 00);
    LocalDateTime endDateIn = LocalDateTime.of(endYear, endMonth, endDay, 23, 59);
    Page<Payment> payments =
        paymentRepository.findAllByStoreCustom(storeId, pageable, startDateIn, endDateIn);
    return payments.map(PaymentDto::of);
  }

  public boolean verifyBlockTransaction(PaymentDto payment) {
    try {
      TransactionDto tx = blockchainService.getTransaction(payment.getTransactionId()).block();
      if (payment.getUser().getEmail().equals(tx.getFrom())
          && payment.getStore().getEmail().equals(tx.getTo())
          && payment.getTotal() == tx.getValue()) {
        payment.setVerified(true);
      }

      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public void createBlockTransaction(PaymentDto payment) {
    User user = userRepository.findByUserId(payment.getUserId());
    Store store = storeRepository.findByStoreId(payment.getStoreId());
    TransactionDto tx = TransactionDto.builder()
        .from(user.getEmail())
        .to(store.getEmail())
        .value(payment.getTotal())
        .build();

    Mono<TransactionDto> u = blockchainService.createTransaction(tx);
    u.subscribe(response -> {
      // 생성된 경우 상태 변경
      payment.setTransactionId(response.getTxId());
      payment.setTestCode(1);
      paymentRepository.save(payment.toEntity());

      // user write 이후 read 불가능하기 때문에 transaction 생성 이후 user write
      userService.setBlockUserBalance(UserDto.of(user));
    });
  }

  public void multiPayment(List<Integer> paymentIds, int status) {
    List<Payment> paymentList = paymentRepository.findAllById(paymentIds);
    HashMap<Integer, Integer> pm = new HashMap<>(paymentList.size());
    for (Payment p : paymentList) {
      if (p.getStatus() != Status.CREATED)
        continue;

      PaymentDto paymentDto = PaymentDto.of(p);
      paymentDto.setStatus(status);
      paymentRepository.save(paymentDto.toEntity());

      Integer key = p.getStoreId();
      pm.merge(key, p.getTotal(), Integer::sum);
    }

    for (Map.Entry<Integer, Integer> entry : pm.entrySet()) {
      Store store = storeRepository.findByStoreId(entry.getKey());
      BlockUserDto blockUser = blockchainService.getUser(store.getEmail()).block();

      blockchainService.setBalance(BlockUserDto.builder()
          .userId(store.getEmail())
          .balance(blockUser.getBalance() - entry.getValue())
          .build())
      .subscribe();
    }
  }

}
