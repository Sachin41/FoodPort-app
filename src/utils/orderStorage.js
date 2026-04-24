export const getOrdersFromStorage = (userEmail) => {
  const data = JSON.parse(localStorage.getItem("orders")) || {};
  return data[userEmail] || [];
};

export const saveOrdersToStorage = (userEmail, orders) => {
  const data = JSON.parse(localStorage.getItem("orders")) || {};
  data[userEmail] = orders;
  localStorage.setItem("orders", JSON.stringify(data));
};