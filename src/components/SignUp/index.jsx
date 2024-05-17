import React from "react";
import WrapperContent from "../WrapperContent";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import { useFormik } from "formik";
import { REG_EMAIL, REG_PHONE } from "../../constant/reg";
import { toast } from "react-toastify";
import authApi from "../../api/authApi";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Vui lòng nhập họ tên";
  }

  if (!values.email) {
    errors.email = "Vui lòng nhập email";
  } else if (!REG_EMAIL.test(values.email)) {
    errors.email = "Email không đúng định dạng";
  }

  if (!values.phone) {
    errors.phone = "Vui lòng nhập số điện thoại";
  } else if (!REG_PHONE.test(values.phone)) {
    errors.phone = "Số điện thoại không đúng định dạng";
  }

  if (!values.password) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
  } else if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Mật khẩu không khớp";
  }

  return errors;
};

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async ({ confirmPassword, ...data }) => {
      try {
        await authApi.register(data);
        toast.success("Đăng ký thành công");

        navigate(ROUTE_PATH.SIGN_IN);
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

          <p className="text-sm font-light">Đăng ký tài khoản</p>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] py-8">
        <WrapperContent className="bg-white rounded-md p-2">
          <div className="border-b border-b-[#eee] pb-2">
            <h1 className="uppercase text-[22px]">Đăng ký tài khoản</h1>

            <div className="flex items-center gap-x-2 mt-1">
              <p>Bạn đã có tài khoản?</p>

              <Link to={ROUTE_PATH.SIGN_IN} className="underline">
                Đăng nhập tại đây
              </Link>
            </div>
          </div>

          <form className="max-w-[550px] mt-6 mb-8 mx-auto" onSubmit={formik.handleSubmit}>
            <h1 className="text-lg font-medium uppercase mb-8 text-center">Thông tin cá nhân</h1>

            <div className="mb-3">
              <label className="block mb-1 text-sm font-bold">
                Họ tên
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                className="h-10 px-5 border border-[#e1e1e1] w-full outline-none"
                placeholder="Họ tên"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

              {formik.errors.name && formik.touched.name && (
                <p className="text-sm text-red-500 font-light mt-1">{formik.errors.name}</p>
              )}
            </div>

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
                Số điện thoại
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                className="h-10 px-5 border border-[#e1e1e1] w-full outline-none"
                placeholder="Số điện thoại"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />

              {formik.errors.phone && formik.touched.phone && (
                <p className="text-sm text-red-500 font-light mt-1">{formik.errors.phone}</p>
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

            <div className="mb-3">
              <label className="block mb-1 text-sm font-bold">
                Xác nhận mật khẩu
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="password"
                className="h-10 px-5 border border-[#e1e1e1] w-full outline-none"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />

              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p className="text-sm text-red-500 font-light mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button className="h-[45px] text-center bg-[#ffe10e] w-full mt-2">Đăng ký</button>
          </form>
        </WrapperContent>
      </div>
    </>
  );
};

export default SignUp;
