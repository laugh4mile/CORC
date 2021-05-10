export async function addUser(userData) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/admin/user/regist`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "새로운 유저를 등록할 수 없습니다.");
  }

  return null;
}

export async function getAllUsers() {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/admin/user/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "결제 내역을 불러올 수 없습니다.");
  }

  const transformedUsers = [];

  for (const key in data) {
    const userObj = {
      id: key,
      ...data[key],
    };

    transformedUsers.push(userObj);
  }

  return transformedUsers;
}

export async function getSingleUser(userId) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/admin/user/info?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "결제 내역을 불러올 수 없습니다.");
  }

  const loadedUser = {
    userId: userId,
    ...data,
  };

  return loadedUser;
}

export async function getAllPayment() {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/admin/user/payment`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "결제 내역을 불러올 수 없습니다.");
  }

  const transformedPayments = [];

  for (const key in data) {
    const paymentObj = {
      id: key,
      ...data[key],
    };

    transformedPayments.push(paymentObj);
  }

  return transformedPayments;
}
