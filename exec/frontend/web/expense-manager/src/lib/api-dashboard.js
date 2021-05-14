const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function expenses() {
  try {
    console.log('cioneect');
    const rs = await axios.get('/board/expenses');
    const data = rs.data;
    console.log('rs', rs);
    return data;
  } catch (err) {
    throw new Error(err || '전체 사용 금액을 불러 올 수 없습니다.');
  }
}
