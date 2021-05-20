const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function expenses() {
  try {
    const rs = await axios.get("/board/expenses");
    return rs.data;
  } catch (err) {
    throw new Error(err || "전체 사용 금액을 불러 올 수 없습니다.");
  }
}

export async function expenseByMonth(year) {
  try {
    const rs = await axios.get(`/board/expenses/month?year=${year}`);
    const data = rs.data;

    return data;
  } catch (err) {
    throw new Error(err || "월별 사용 금액을 불러 올 수 없습니다.");
  }
}

export async function expenseByDay(year) {
  try {
    const rs = await axios.get(`/board/expenses/day?year=${year}`);
    const data = rs.data;

    return data;
  } catch (err) {
    throw new Error(err || "일별 사용 금액을 불러 올 수 없습니다.");
  }
}

export async function recentPayment({ page, size }) {
  try {
    const rs = await axios.get(`/board/payment/recent?page=${page}&size=${size}`);
    const data = rs.data.payment;
    return data;
  } catch (err) {
    throw new Error(err || "최근 결제 현황을 불러 올 수 없습니다.");
  }
}

export async function expenseForStatistics() {
  try {
    const rs = await axios.get("/board/expenses/statistics");
    return rs.data;
  } catch (err) {
    throw new Error(err || "전체 사용 금액을 불러 올 수 없습니다.");
  }
}

export async function getVerifiedUser() {
  try {
    const rs = await axios.get(`/board/user/verified`);
    const data = rs.data;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getVerifiedStore() {
  try {
    const rs = await axios.get(`/board/store/verified`);
    const data = rs.data;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getVerifiedPayment() {
  try {
    const rs = await axios.get(`/board/payment/verified`);
    const data = rs.data;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPeersStatus() {
  try {
    const rs = await axios.get(`/blockchain/peer-status`);
    const data = rs.data;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}
