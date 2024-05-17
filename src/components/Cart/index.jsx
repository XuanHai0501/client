import React from "react";
import WrapperContent from "../WrapperContent";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import { formatPrice } from "../../utils/common";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeProduct } from "../../store/cartSlice";

const Cart = () => {
  const { products, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-[#eee]">
        <WrapperContent className="flex items-center py-3 gap-x-2">
          <Link to={ROUTE_PATH.HOME}>
            <p className="text-[#999] text-sm font-light hover:text-primary">Trang chủ</p>
          </Link>

          <p className="text-sm font-light">/</p>

          <p className="text-sm font-light">Giỏ hàng</p>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] py-8">
        <WrapperContent className="bg-white rounded-md p-2">
          <div className="border-b border-b-[#eee] pb-2">
            <h1 className="uppercase text-[32px]">Giỏ hàng</h1>
          </div>

          {products?.length ? (
            <div className="flex gap-x-4 mt-2 mb-4">
              <div className="flex-1">
                <table className="w-full">
                  <tbody>
                    {products?.map((product) => (
                      <tr key={`product-item-${product._id}`} className="[&:not(:last-child)]:border-b border-[#eee]">
                        <td className="px-2 py-3">
                          <p
                            onClick={() => dispatch(removeProduct(product._id))}
                            className="cursor-pointer hover:text-primary"
                          >
                            Xoá
                          </p>
                        </td>

                        <td className="px-2 py-3">
                          <img src={product.image} alt="" className="w-[100px] h-[100px] object-cover" />
                        </td>

                        <td className="px-2 py-3">
                          <Link to={ROUTE_PATH.PRODUCT_DETAIL(product.slug)} className="font-light hover:text-primary">
                            {product.name}
                          </Link>
                        </td>

                        <td className="font-medium px-2 py-3">{formatPrice(product.price * product.quantity)}</td>

                        <td className="px-2 py-3">
                          <div className="flex h-[30px] mt-2">
                            <button
                              onClick={() => dispatch(decreaseQuantity(product._id))}
                              className="px-4 border-t border-l border-b border-[#ced4da] rounded-tl-md rounded-bl-md"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="px-3 text-sm border border-[#ced4da] text-[#495057] outline-none w-16 text-center [&:focus]:border-[#fbd947]"
                              value={product.quantity}
                              disabled
                            />
                            <button
                              onClick={() => dispatch(increaseQuantity(product._id))}
                              className="px-4 border-t border-r border-b border-[#ced4da] rounded-tr-md rounded-br-md"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-2/6 border-l border-l-[#eee] pl-4">
                <div className="flex items-center justify-between">
                  <p className="font-light">Tổng tiền</p>

                  <p className="text-lg font-medium">{formatPrice(totalPrice)}</p>
                </div>

                <Link className="block mt-2" to={ROUTE_PATH.CHECKOUT}>
                  <button className="bg-[#ff5722] rounded h-9 w-full text-white">Tiến hành thanh toán</button>
                </Link>

                <div className="text-center">
                  <Link className="inline-flex gap-x-2 items-center text-[#6c757d] mt-4">
                    <FaArrowLeft />
                    <p>Tiếp tục mua hàng</p>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 mb-6">
              <span>(Chưa có sản phẩm nào) nhấn vào</span>
              <Link to={ROUTE_PATH.HOME} className="text-[#007bff]">
                {" "}
                cửa hàng{" "}
              </Link>
              <span>để mua hàng</span>
            </div>
          )}
        </WrapperContent>
      </div>
    </>
  );
};

export default Cart;
