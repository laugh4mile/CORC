package com.web.shinhan;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener {

  private Logger log = LoggerFactory.getLogger(this.getClass());

  @Override
  public void sessionCreated(HttpSessionEvent se) {
    se.getSession().setMaxInactiveInterval(3); // 세션만료60분
    System.out.println("세션 생성");
    System.out.println("세션 생성");
    System.out.println("세션 생성");
    System.out.println("세션 생성");
  }

  @Override
  public void sessionDestroyed(HttpSessionEvent se) {
    System.out.println("세션 파괴");
    System.out.println("세션 파괴");
    System.out.println("세션 파괴");
    System.out.println("세션 파괴");
  }
}