package com.web.shinhan;

import java.util.TimeZone;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSessionListener;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

  @PostConstruct
  public void init() {
    TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
  }

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }
//
  @Bean
  public HttpSessionListener httpSessionListener() {
    return new SessionListener();
  }

}
