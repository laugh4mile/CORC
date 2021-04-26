package com.web.shinhan.model;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class ReviewDto {
	private int id_review;
	private int id_user;
	private int id_store;
	private String store_name;
	private float score;
	private String content;
	private String upload_date;
	private String update_date;
	private int likeCnt;
	private List<MultipartFile> files;
	private List<String> unmodified;
	private String thumbnail;
	
	private String nickname;

	// likeCheck
	private int likeCheck;
	
	// email
	private String email;
	
	public String getNickname() {
		return nickname;
	}
	
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public List<String> getUnmodified() {
		return unmodified;
	}

	public String getStore_name() {
		return store_name;
	}

	public void setStore_name(String store_name) {
		this.store_name = store_name;
	}

	public void setUnmodified(List<String> unmodified) {
		this.unmodified = unmodified;
	}

	public List<MultipartFile> getFiles() {
		return files;
	}

	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}

	public int getLikeCnt() {
		return likeCnt;
	}

	public void setLikeCnt(int likeCnt) {
		this.likeCnt = likeCnt;
	}

	public int getId_review() {
		return id_review;
	}

	public void setId_review(int id_review) {
		this.id_review = id_review;
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

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUpload_date() {
		return upload_date;
	}

	public void setUpload_date(String upload_date) {
		this.upload_date = upload_date;
	}

	public String getUpdate_date() {
		return update_date;
	}

	public void setUpdate_date(String update_date) {
		this.update_date = update_date;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public int getLikeCheck() {
		return likeCheck;
	}

	public void setLikeCheck(int likeCheck) {
		this.likeCheck = likeCheck;
	}
	
	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "ReviewDto [id_review=" + id_review + ", id_user=" + id_user + ", id_store=" + id_store + ", store_name="
				+ store_name + ", score=" + score + ", content=" + content + ", upload_date=" + upload_date
				+ ", update_date=" + update_date + ", likeCnt=" + likeCnt + ", files=" + files + ", unmodified="
				+ unmodified + ", thumbnail=" + thumbnail + ", nickname=" + nickname + ", likeCheck=" + likeCheck
				+ ", email=" + email + "]";
	}

}
