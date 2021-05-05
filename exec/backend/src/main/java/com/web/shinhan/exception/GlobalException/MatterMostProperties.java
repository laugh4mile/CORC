package com.web.shinhan.exception.GlobalException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@Primary
public class MatterMostProperties {

  private String channel;
  private String pretext;
  private String color = "#ff5d52";
  private String authorName;
  private String authorIcon;
  private String title;
  private String text = "";
  private String footer = LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

}