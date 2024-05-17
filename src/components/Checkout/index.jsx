import React from "react";
import { formatPrice } from "../../utils/common";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { ROUTE_PATH } from "../../constant/route";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { REG_EMAIL, REG_PHONE } from "../../constant/reg";
import { toast } from "react-toastify";
import orderApi from "../../api/orderApi";
import { resetCart } from "../../store/cartSlice";

const validate = (values) => {
  const errors = {};

  if (!values.customerName) {
    errors.customerName = "Vui lòng nhập email";
  }

  if (!values.customerEmail) {
    errors.customerEmail = "Vui lòng nhập email";
  } else if (!REG_EMAIL.test(values.customerEmail)) {
    errors.customerEmail = "Email không đúng định dạng";
  }

  if (!values.customerPhone) {
    errors.customerPhone = "Vui lòng nhập số điện thoại";
  } else if (!REG_PHONE.test(values.customerPhone)) {
    errors.customerPhone = "Số điện thoại không đúng định dạng";
  }

  if (!values.address) {
    errors.address = "Vui lòng nhập địa chỉ nhận hàng";
  }

  return errors;
};

const Checkout = () => {
  const { products, totalPrice } = useSelector((state) => state.cart);
  const { isLogged, userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      customerName: userInfo?.name,
      customerEmail: userInfo?.email,
      customerPhone: userInfo?.phone,
      address: "",
      message: "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      const productsFormat = products.map((it) => ({ quantity: it.quantity, productId: it._id }));
      try {
        await orderApi.createOrder({
          ...values,
          products: productsFormat,
          orderBy: isLogged ? userInfo?._id : null,
        });

        toast.success("Đặt hàng thành công");
        dispatch(resetCart());
        navigate(ROUTE_PATH.HOME);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-7 pt-14 pl-28 pr-6">
        <h1 className="text-[#2a9dcc] text-[28px]">Phụ tùng ô tô Vinh Kiệt</h1>

        <p className="text-lg text-[#333] font-semibold mt-4 mb-4">Thông tin mua hàng</p>

        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-bold">
              Họ và tên
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              className="h-10 px-5 rounded border border-[#e1e1e1] w-full outline-none"
              placeholder="Họ tên"
              name="customerName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customerName}
            />

            {formik.errors.customerName && formik.touched.customerName && (
              <p className="text-sm text-red-500 font-light mt-1">{formik.errors.customerName}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-bold">
              Email
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="email"
              className="h-10 px-5 rounded border border-[#e1e1e1] w-full outline-none"
              placeholder="Email"
              name="customerEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customerEmail}
            />

            {formik.errors.customerEmail && formik.touched.customerEmail && (
              <p className="text-sm text-red-500 font-light mt-1">{formik.errors.customerEmail}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-bold">
              Số điện thoại
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              className="h-10 px-5 rounded border border-[#e1e1e1] w-full outline-none"
              placeholder="Số điện thoại"
              name="customerPhone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customerPhone}
            />

            {formik.errors.customerPhone && formik.touched.customerPhone && (
              <p className="text-sm text-red-500 font-light mt-1">{formik.errors.customerPhone}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-bold">
              Địa chỉ
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              className="h-10 px-5 rounded border border-[#e1e1e1] w-full outline-none"
              placeholder="Địa chỉ"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />

            {formik.errors.address && formik.touched.address && (
              <p className="text-sm text-red-500 font-light mt-1">{formik.errors.address}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-bold">Ghi chú đơn hàng</label>

            <textarea
              className="border border-[#e1e1e1] rounded px-5 py-2 w-full outline-none"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              rows={5}
              id=""
              placeholder="Ghi chú (Tuỳ chọn)"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <Link to={ROUTE_PATH.CART} className="text-sm text-[#2a9dcc] flex items-center gap-x-1">
              <FaChevronLeft />
              Giỏ hàng
            </Link>

            <button className="text-sm bg-[#357ebd] text-white rounded px-4 min-w-40 py-3 hover:bg-[#2a6395]">
              Đặt hàng
            </button>
          </div>
        </form>
      </div>

      <div className="col-span-5 bg-[#fafafa] pr-28 border-l border-l-[#e1e1e1]">
        <p className="text-lg text-[333] font-semibold px-6 py-4 border-b border-b-[#e1e1e1]">Đơn hàng (3 sản phẩm)</p>

        <div className="px-6 py-4 mb-2">
          <div>
            {products?.map((it) => (
              <div key={`product-item-${it._id}`} className="flex items-center gap-x-2 mb-3">
                <div className="relative inline-block">
                  <img
                    src={it.image}
                    alt=""
                    className="w-[50px] h-[50px] object-cover rounded border border-[rgba(0,0,0,.1)]"
                  />

                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#2a9dcc] text-white text-sm flex justify-center items-center font-medium">
                    {it.quantity}
                  </span>
                </div>

                <p className="text-sm font-medium text-[#333] flex-1">{it.name}</p>

                <p className="text-sm text-[#717171]">{formatPrice(it.quantity * it.price)}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 border-t border-t-[#eee] pt-4">
            <p className="text-lg text-[#717171]">Tổng cộng</p>
            <p className="text-[#2a9dcc] text-xl font-medium">{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
