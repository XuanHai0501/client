import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { TOKEN_STORAGE_KEY } from "../../constant/common";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { initialProfile } from "../../store/authSlice";

const AppLayout = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const { data } = await userApi.getProfile();
      dispatch(initialProfile(data));
    } catch (error) {
      console.log(error);
    }
  };

  return <Outlet />;
};

export default AppLayout;
