import { axiosClient } from "./axiosClient";

const productApi = {
  getAllProducts: (params) => {
    const url = "/products";

    return axiosClient.get(url, {
      params,
    });
  },
  createProduct: (data) => {
    const url = "/products";
    return axiosClient.post(url, data);
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`;

    return axiosClient.delete(url);
  },
  getProduct: (slug) => {
    const url = `/products/${slug}`;
    return axiosClient.get(url);
  },
  getProductsRelated: (slug) => {
    const url = `/products/${slug}/related`;

    return axiosClient.get(url);
  },
  updateProduct: ({ id, ...data }) => {
    const url = `/products/${id}`;

    return axiosClient.put(url, data);
  },
};

export default productApi;
