import { axiosClient } from "./axiosClient";

const categoryApi = {
  getAllCategory: (params) => {
    const url = "/categories";

    return axiosClient.get(url, {
      params,
    });
  },
  createCategory: (data) => {
    const url = "/categories";
    return axiosClient.post(url, data);
  },
  deleteCategory: (id) => {
    const url = `/categories/${id}`;

    return axiosClient.delete(url);
  },
  getCategory: (slug) => {
    const url = `/categories/${slug}`;
    return axiosClient.get(url);
  },
  updateCategory: ({ id, ...data }) => {
    const url = `/categories/${id}`;

    return axiosClient.put(url, data);
  },
};

export default categoryApi;
