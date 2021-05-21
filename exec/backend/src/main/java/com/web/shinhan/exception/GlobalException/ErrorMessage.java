package com.web.shinhan.exception.GlobalException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ErrorMessage {

  private final String message;
  private final Integer status;
}
