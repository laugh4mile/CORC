const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function getAllStores() {
  try {
    const rs = await axios.get('/admin/store/list');
    const storeData = rs.data.storeLists.content;
    console.log(rs);
    const transformedStores = [];

    for (const key in storeData) {
      const storeObj = {
        id: key,
        ...storeData[key],
      };

      transformedStores.push(storeObj);
    }

    return transformedStores;
  } catch (err) {
    throw new Error(err || '가맹점 목록을 불러올 수 없습니다.');
  }
}

export async function getAllRequestedStores() {
  try {
    const rs = await axios.get('/admin/store/list/unassigned');
    const storeData = rs.data.storeLists.content;
    console.log(rs);
    const transformedStores = [];

    for (const key in storeData) {
      const storeObj = {
        id: key,
        ...storeData[key],
      };

      transformedStores.push(storeObj);
    }

    return transformedStores;
  } catch (err) {
    throw new Error(err || '가맹점 신청 목록을 불러올 수 없습니다.');
  }
}

export async function getSingleStore(storeId) {
  try {
    const rs = await axios.get(`/admin/store/info?storeId=${storeId}`);
    const data = rs.data.info;

    return data;
  } catch (err) {
    throw new Error(err || '가맹점 정보를 불러올 수 없습니다.');
  }
}

export async function getStore(page, size) {
  try {
    const rs = await axios.get(`/admin/store/list?page=${page}&size=${size}`);
    const data = rs.data.storeList.content;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getStorePayment(storeId) {
  try {
    const rs = await axios.get(`/admin/store/payment?storeId=${storeId}`);
    const data = rs.data.paymentList.content;
    console.log(rs);
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
    throw new Error(err || '가맹점 정보를 불러올 수 없습니다.');
  }
}

export async function getAllPayment() {
  try {
    const rs = await axios.get('/admin/payment');
    const data = rs.data.paymentList.content;
    console.log(rs);
    const transformedPayments = [];

    for (const key in data) {
      const paymentObj = {
        id: key,
        ...data[key],
      };

      transformedPayments.push(paymentObj);
    }

    console.log('tP', transformedPayments);
    return transformedPayments;
  } catch (err) {
    throw new Error(err || '결제 내역을 불러올 수 없습니다.');
  }
}
