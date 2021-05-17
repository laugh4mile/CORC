package com.web.shinhan.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class VerityResult<T> {
  private int verified;
  private int total;
  private List<T> failedList;
}
