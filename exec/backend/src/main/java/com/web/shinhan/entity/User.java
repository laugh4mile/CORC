package com.web.shinhan.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;

	private int employee_num;
	private String email;
	private String user_name;
	private String password;
	private String department;
	private String position;
	private String contact;
	private String days;
	private int balance;
	private int card_limit;
	private int active;
	private LocalDateTime access_time;

	@Builder
	public User(int user_id, int employee_num, String email, String user_name, String password, String department,
			String position, String contact, String days, int balance, int card_limit, int active,
			LocalDateTime access_time) {
		this.user_id = user_id;
		this.employee_num = employee_num;
		this.email = email;
		this.user_name = user_name;
		this.password = password;
		this.department = department;
		this.position = position;
		this.contact = contact;
		this.days = days;
		this.balance = balance;
		this.card_limit = card_limit;
		this.active = active;
		this.access_time = access_time;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", employee_num=" + employee_num + ", email=" + email + ", user_name="
				+ user_name + ", password=" + password + ", department=" + department + ", position=" + position
				+ ", contact=" + contact + ", days=" + days + ", balance=" + balance + ", card_limit=" + card_limit
				+ ", active=" + active + ", access_time=" + access_time + "]";
	}
}