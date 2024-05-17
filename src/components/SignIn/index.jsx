import React from "react";
import WrapperContent from "../WrapperContent";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import { useFormik } from "formik";
import { REG_EMAIL } from "../../constant/reg";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { TOKEN_STORAGE_KEY } from "../../constant/common";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Vui lòng nhập email";
  } else if (!REG_EMAIL.test(values.email)) {
    errors.email = "Email không đúng định dạng";
  }

  if (!values.password) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  return errors;
};

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { data } = await authApi.login(values);

        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
        window.location.href = ROUTE_PATH.HOME;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="bg-[#eee]">
        <WrapperContent className="flex items-center py-3 gap-x-2">
          <Link to={ROUTE_PATH.HOME}>
            <p className="text-[#999] text-sm font-light hover:text-primary">Trang chủ</p>
          </Link>

          <p className="text-sm font-light">/</p>

          <p className="text-sm font-light">Đăng nhập tài khoản</p>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] py-8">
        <WrapperContent className="bg-white rounded-md p-2">
          <div className="border-b border-b-[#eee] pb-2">
            <h1 className="uppercase text-[22px]">Đăng nhập tài khoản</h1>

            <div className="flex items-center gap-x-2 mt-1">
              <p>Bạn chưa có tài khoản?</p>

              <Link to={ROUTE_PATH.SIGN_UP} className="underline">
                Đăng ký tại đây
              </Link>
            </div>
          </div>

          <form className="max-w-[550px] mt-6 mb-8 mx-auto" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="block mb-1 text-sm font-bold">
                Email
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                className="h-10 px-5 border border-[#e1e1e1] w-full outline-none"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-500 font-light mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm font-bold">
                Mật khẩu
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="password"
                className="h-10 px-5 border border-[#e1e1e1] w-full outline-none"
                placeholder="Mật khẩu"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-500 font-light mt-1">{formik.errors.password}</p>
              )}
            </div>

            <div className="text-xs">
              <span>Quên mật khẩu? </span>
              <span>
                Nhấn vào
                <Link to={ROUTE_PATH.FORGOT_PASSWORD} className="text-[#007bff]">
                  {" "}
                  đây
                </Link>
              </span>
            </div>

            <button className="h-[45px] text-center bg-[#ffe10e] w-full mt-2">Đăng nhập</button>
          </form>
        </WrapperContent>
      </div>
    </>
  );
};

export default SignIn;
