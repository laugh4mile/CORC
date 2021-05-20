const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function getSingleStore(storeId) {
  try {
    const rs = await axios.get(`/admin/store/info?storeId=${storeId}`);
    const data = rs.data.info;
    return data;
  } catch (err) {
    throw new Error(err || "가맹점 정보를 불러올 수 없습니다.");
  }
}

export async function getStores({ page, size }) {
  try {
    const rs = await axios.get(`/admin/store/list?page=${page}&size=${size}`);
    const data = rs.data.storeLists;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function storeApplication({ storeStatus, storeIds }) {
  try {
    const rs = await axios.put(`/admin/store/status?storeStatus=${storeStatus}`, storeIds);
    return rs.data;
  } catch (err) {
    throw new Error(err || "가맹점 정보를 수정할 수 없습니다.");
  }
}

export async function paymentStatus({ paymentStatus, paymentIds }) {
  try {
    const rs = await axios.put(`/admin/payment/status?paymentStatus=${paymentStatus}`, paymentIds);
    return rs.data;
  } catch (err) {
    throw new Error(err || "가맹점 정보를 수정할 수 없습니다.");
  }
}

export async function confirmPayment(paymentIds) {
  try {
    const rs = await axios.put(`/admin/payment/confirm`, paymentIds);
    return rs.data;
  } catch (err) {
    throw new Error(err || "정산을 할 수 없습니다.");
  }
}

export async function modifyStore(storeData) {
  try {
    const rs = await axios.put(`/admin/store/modify`, storeData);
    return rs.data;
  } catch (err) {
    throw new Error(err || "가맹점 정보를 수정할 수 없습니다.");
  }
}

export async function getAllRequestedStores({ page, size }) {
  try {
    const rs = await axios.get(`/admin/store/list/unassigned?page=${page}&size=${size}`);
    const data = rs.data.storeLists;
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getStorePayment({ storeId, pageInfo, sort = { sortBy: "paymentId", isDesc: true } }) {
  try {
    const rs = await axios.get(
      `/admin/store/payment?storeId=${storeId}&page=${pageInfo.page}&size=${pageInfo.size}` +
        (sort ? `&sort=${sort.sortBy},${sort.isDesc ? "desc" : "asc"}` : "")
    );
    const data = rs.data.paymentList;

    return data;
  } catch (err) {
    throw new Error(err || "가맹점 정보를 불러올 수 없습니다.");
  }
}

export async function getAllPayment({ page, size, sort = { sortBy: "paymentId", isDesc: true } }) {
  try {
    const rs = await axios.get(
      `/admin/payment?page=${page}&size=${size}` + (sort ? `&sort=${sort.sortBy},${sort.isDesc ? "desc" : "asc"}` : "")
    );
    const data = rs.data.paymentList;

    return data;
  } catch (err) {
    throw new Error(err || "결제 내역을 불러올 수 없습니다.");
  }
}

export async function getCities() {
  try {
    const rs = await axios.get("/admin/sido");
    return rs.data.sido;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getRegions(cityId) {
  if (cityId === undefined) throw new Error("Insert cityId");
  try {
    const rs = await axios.get(`/admin/gugun?sidoCode=${cityId}`);
    return rs.data.gugun;
  } catch (err) {
    throw new Error(err);
  }
}
