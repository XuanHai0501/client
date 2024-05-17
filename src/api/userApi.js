import { axiosClient } from "./axiosClient";

const userApi = {
  getProfile: () => {
    const url = "/user/profile";

    return axiosClient.get(url);
  },
};

export default userApi;
