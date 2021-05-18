const axios = require("axios").default;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function login(email, password) {
  try {
    const rs = await axios.post("/login/web", {
      email: email,
      password: password,
    });
    return rs.data;
  } catch (err) {
    throw new Error(err);
  }
}
