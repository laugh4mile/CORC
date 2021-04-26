package com.web.shinhan.model;

public class BookmarkDto {
	private int id_bookmark;
	private int id_store;
	private int id_user;
	private String store_name;
	private String score;
	private String address;
	private int active;
	
	
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStore_name() {
		return store_name;
	}
	public void setStore_name(String store_name) {
		this.store_name = store_name;
	}
	
	public int getId_bookmark() {
		return id_bookmark;
	}
	public void setId_bookmark(int id_bookmark) {
		this.id_bookmark = id_bookmark;
	}
	public int getId_user() {
		return id_user;
	}
	public void setId_user(int id_user) {
		this.id_user = id_user;
	}
	public int getId_store() {
		return id_store;
	}
	public void setId_store(int id_store) {
		this.id_store = id_store;
	}
	public int getActive() {
		return active;
	}
	public void setActive(int active) {
		this.active = active;
	}
	@Override
	public String toString() {
		return "BookmarkDto [id_bookmark=" + id_bookmark + ", id_store=" + id_store + ", id_user=" + id_user
				+ ", store_name=" + store_name + ", score=" + score + ", address=" + address + ", active=" + active
				+ "]"+"\n";
	}
	
}
