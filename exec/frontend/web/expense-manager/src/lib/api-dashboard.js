const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

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
