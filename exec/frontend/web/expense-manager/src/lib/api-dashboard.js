const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function expenses() {
  try {
    const rs = await axios.get('/board/expenses');
    const data = rs.data;
    return data;
  } catch (err) {
    throw new Error(err || '전체 사용 금액을 불러 올 수 없습니다.');
  }
}

export async function expenseByMonth(year) {
  try {
    const rs = await axios.get(`/board/expenses/month?year=${year}`);
    const data = rs.data;

    console.log('expenseByMonth data', data);
    return data;
  } catch (err) {
    throw new Error(err || '전체 사용 금액을 불러 올 수 없습니다.');
  }
}

export async function recentPayment({ page, size }) {
  try {
    const rs = await axios.get(
      `/board/payment/recent?page=${page}&size=${size}`
    );
    const data = rs.data.payment;
    console.log('payment data', data);
    return data;
  } catch (err) {
    throw new Error(err || '최근 결제 현황을 불러 올 수 없습니다.');
  }
}

export async function expenseForStatistics() {
  try {
    const rs = await axios.get('/board/expenses/statistics');
    const data = rs.data;
    return data;
  } catch (err) {
    throw new Error(err || '전체 사용 금액을 불러 올 수 없습니다.');
  }
}
