const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

// export async function getAllStores() {
//   try {
//     const rs = await axios.get('/admin/store/list');
//     const storeData = rs.data.storeLists.content;
//     console.log(rs);
//     const transformedStores = [];

//     for (const key in storeData) {
//       const storeObj = {
//         id: key,
//         ...storeData[key],
//       };

//       transformedStores.push(storeObj);
//     }

//     return transformedStores;
//   } catch (err) {
//     throw new Error(err || '가맹점 목록을 불러올 수 없습니다.');
//   }
// }

export async function getSingleStore(storeId) {
  try {
    const rs = await axios.get(`/admin/store/info?storeId=${storeId}`);
    const data = rs.data.info;
    console.log('rs', rs);
    return data;
  } catch (err) {
    throw new Error(err || '가맹점 정보를 불러올 수 없습니다.');
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
    const rs = await axios.put(
      `/admin/store/status?storeStatus=${storeStatus}`,
      storeIds
    );
    return rs.data;
  } catch (err) {
    throw new Error(err || '가맹점 정보를 수정할 수 없습니다.');
  }
}

export async function confirmPayment(paymentIds) {
  try {
    console.log('paymentIds', paymentIds);
    const rs = await axios.put(`/admin/payment/confirm`, paymentIds);
    return rs.data;
  } catch (err) {
    throw new Error(err || '정산을 할 수 없습니다.');
  }
}

export async function modifyStore(storeData) {
  try {
    const rs = await axios.post(`/admin/store/modify`, storeData);
    return rs.data;
  } catch (err) {
    throw new Error(err || '가맹점 정보를 수정할 수 없습니다.');
  }
}

export async function getAllRequestedStores({ page, size }) {
  try {
    const rs = await axios.get(
      `/admin/store/list/unassigned?page=${page}&size=${size}`
    );
    const data = rs.data.storeLists;

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getStorePayment(storeId, page, size) {
  try {
    const rs = await axios.get(
      `/admin/store/payment?storeId=${storeId}&page=${page}&size=${size}`
    );
    const data = rs.data.paymentList;
    console.log('data', data);

    return data;
  } catch (err) {
    throw new Error(err || '가맹점 정보를 불러올 수 없습니다.');
  }
}

export async function getAllPayment({ page, size }) {
  try {
    const rs = await axios.get(`/admin/payment?page=${page}&size=${size}`);
    const data = rs.data.paymentList;
    console.log(rs);

    return data;
  } catch (err) {
    throw new Error(err || '결제 내역을 불러올 수 없습니다.');
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
  if (cityId === undefined) throw new Error('Insert cityId');
  try {
    const rs = await axios.get(`/admin/gugun?sidoCode=${cityId}`);
    return rs.data.gugun;
  } catch (err) {
    throw new Error(err);
  }
}
