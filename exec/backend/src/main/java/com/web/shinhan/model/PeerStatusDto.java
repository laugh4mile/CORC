package com.web.shinhan.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PeerStatusDto {
  private String peer;
  private String status;
  private String time;
}
