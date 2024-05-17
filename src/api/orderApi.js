import { axiosClient } from "./axiosClient";

const orderApi = {
  getAllOrders: () => {
    const url = "/orders";

    return axiosClient.get(url);
  },
  getOrder: (orderId) => {
    const url = `/orders/${orderId}`;

    return axiosClient.get(url);
  },
  updateStatus: (orderId, status) => {
    const url = `/orders/${orderId}`;

    return axiosClient.put(url, { status });
  },
  createOrder: (data) => {
    const url = "/orders";

    return axiosClient.post(url, data);
  },
};

export default orderApi;
