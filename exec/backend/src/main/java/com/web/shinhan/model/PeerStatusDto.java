package com.web.shinhan.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PeerStatusDto {
  private String status;
  private String time;
}
