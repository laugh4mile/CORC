package com.web.shinhan.model;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class StoreDto {
	// store table
	private int id_store;
	private String store_name;
	private String muslim_friendly;
	private String location_region;
	private String food_category;
	private String address;
	private String tel;
	private String working_time;
	private String days_closed;
	private int parking;
	private String image;
	private String thumb_image;
	private String lat;
	private String lng;
	private int active;

	// 만약 store_image를 만든다면
	private List<MultipartFile> files;
	private List<String> unmodified;
	private String thumbnail;

	// 조회수, 리뷰수
	private int hits;
	private int reviews;
	
	// 평균 평점
	private double averageScore;
	
	
	public void setReviews(int reviews) {
		this.reviews = reviews;
	}
	
	public int getId_store() {
		return id_store;
	}

	public void setId_store(int id_store) {
		this.id_store = id_store;
	}

	public String getStore_name() {
		return store_name;
	}
	public void setStore_name(String store_name) {
		this.store_name = store_name;
	}
	public String getMuslim_friendly() {
		return muslim_friendly;
	}
	public void setMuslim_friendly(String muslim_friendly) {
		this.muslim_friendly = muslim_friendly;
	}
	public String getLocation_region() {
		return location_region;
	}
	public void setLocation_region(String location_region) {
		this.location_region = location_region;
	}
	public String getFood_category() {
		return food_category;
	}
	public void setFood_category(String food_category) {
		this.food_category = food_category;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getWorking_time() {
		return working_time;
	}
	public void setWorking_time(String working_time) {
		this.working_time = working_time;
	}
	public String getDays_closed() {
		return days_closed;
	}
	public void setDays_closed(String days_closed) {
		this.days_closed = days_closed;
	}
	public int getParking() {
		return parking;
	}
	public void setParking(int parking) {
		this.parking = parking;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getThumb_image() {
		return thumb_image;
	}
	public void setThumb_image(String thumb_image) {
		this.thumb_image = thumb_image;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
	public int getActive() {
		return active;
	}
	public void setActive(int active) {
		this.active = active;
	}
	
	// 이미지
	public List<MultipartFile> getFiles() {
		return files;
	}
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
	public List<String> getUnmodified() {
		return unmodified;
	}
	public void setUnmodified(List<String> unmodified) {
		this.unmodified = unmodified;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	// 조회수 리뷰수
	public int getHits() {
		return hits;
	}
	public void setHits(int hits) {
		this.hits = hits;
	}
	public int getReviews() {
		return reviews;
	}
	
	public double getAverageScore() {
		return averageScore;
	}
	public void setAverageScore(double averageScore) {
		this.averageScore = averageScore;
	}
	@Override
	public String toString() {
		return "StoreDto [id_store=" + id_store + ", store_name=" + store_name + ", muslim_friendly=" + muslim_friendly
				+ ", location_region=" + location_region + ", food_category=" + food_category + ", address=" + address
				+ ", tel=" + tel + ", working_time=" + working_time + ", days_closed=" + days_closed + ", parking="
				+ parking + ", image=" + image + ", thumb_image=" + thumb_image + ", lat=" + lat + ", lng=" + lng
				+ ", active=" + active + ", files=" + files + ", unmodified=" + unmodified + ", thumbnail=" + thumbnail
				+ ", hits=" + hits + ", reviews=" + reviews + ", averageScore=" + averageScore + "]";
	}
}
