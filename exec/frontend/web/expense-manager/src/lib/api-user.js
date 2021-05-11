const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function addUser(userData) {
  try {
    const rs = await axios.post("/admin/user/regist", userData);
    return rs.data;
  } catch (err) {
    throw new Error(err || "새로운 유저를 등록할 수 없습니다.");
  }
}

export async function getAllUsers() {
  try {
    const rs = await axios.get("/admin/user/list");
    const data = rs.data.userList.content;
    getAllPayment();

    console.log("data", data);

    const transformedUsers = [];

    for (const key in data) {
      const userObj = {
        id: key,
        ...data[key],
      };

      transformedUsers.push(userObj);
    }

    return transformedUsers;
  } catch (err) {
    throw new Error(err || "유저 리스트를 불러올 수 없습니다.");
  }
}

export async function getSingleUser(userId) {
  try {
    const rs = await axios.get(`/admin/user/info?userId=${userId}`);
    const data = rs.data.info;

    return data;
  } catch (err) {
    throw new Error(err || "유저 정보를 불러올 수 없습니다.");
  }
}

export async function getUserPaymentDetails(userId) {
  try {
    const rs = await axios.get(`/admin/user/payment?userId=${userId}`);
    const data = rs.data.info;

    return data;
  } catch (err) {
    throw new Error(err || "결제 내역을 불러올 수 없습니다.");
  }
}

export async function getUsers({ page, size }) {
  try {
    const rs = await axios.get(`/admin/user/list?page=${page}&size=${size}`);
    const data = rs.data.userList;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getAllPayment() {
  try {
    const rs = await axios.get("/admin/payment");
    const data = rs.data.paymentList.content;
    const transformedPayments = [];

    for (const key in data) {
      const paymentObj = {
        id: key,
        ...data[key],
      };

      transformedPayments.push(paymentObj);
    }

    return transformedPayments;
  } catch (err) {
    throw new Error(err || "결제 내역을 불러올 수 없습니다.");
  }
}

export async function getCities() {
  try {
    const rs = await axios.get('/admin/sido');
    return rs.data.sido;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getRegions(cityId) {
  if (cityId == undefined) throw new Error('Insert cityId');
  try {
    const rs = await axios.get(`/admin/gugun?sidoCode=${cityId}`);
    return rs.data.gugun;
  } catch (err) {
    throw new Error(err);
  }
}
