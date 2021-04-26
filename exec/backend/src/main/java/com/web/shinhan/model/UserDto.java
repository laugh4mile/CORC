package com.web.shinhan.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.web.shinhan.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class UserDto {
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
	private String prePwd;

	@Builder
	public UserDto(int user_id, int employee_num, String email, String user_name, String password, String department,
			String position, String contact, String days, int balance, int card_limit, int active,
			LocalDateTime access_time, String prePwd) {
		super();
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
		this.prePwd = prePwd;
	}
	
	public User toEntity() {
		return User.builder()
				.user_id(user_id)
				.employee_num(employee_num)
				.email(email)
				.user_name(user_name)
				.password(password)
				.department(department)
				.position(position)
				.contact(contact)
				.days(days)
				.balance(balance)
				.card_limit(card_limit)
				.active(active)
				.access_time(access_time)
				.build();
	}
	
}
