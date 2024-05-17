import React, { useEffect, useState } from "react";
import WrapperContent from "../WrapperContent";
import { Link, useParams } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import { BsFillTagFill } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { formatPrice } from "../../utils/common";
import ProductItem from "../UI/ProductItem";
import productApi from "../../api/productApi";

import styles from "./index.module.css";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productsRelated, setProductsRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    params?.slug && fetchProduct();
  }, [params?.slug]);

  const fetchProduct = async () => {
    try {
      const { data } = await productApi.getProduct(params?.slug);
      const { data: prodsRelated } = await productApi.getProductsRelated(params?.slug);
      setProductsRelated(prodsRelated);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddCart = () => {
    if (+quantity <= 0 || quantity > product?.quantity) {
      toast.error("Số lượng SP không hợp lệ!");
      return;
    }

    dispatch(
      addCart({
        quantity: +quantity,
        product,
      }),
    );

    toast.success("Đã thêm SP vào giỏ hàng");
    setQuantity(1);
  };

  return (
    <>
      <div className="bg-[#eee]">
        <WrapperContent className="flex items-center py-3 gap-x-2">
          <Link to={ROUTE_PATH.HOME}>
            <p className="text-[#999] text-sm font-light hover:text-primary">Trang chủ</p>
          </Link>

          <p className="text-sm font-light">/</p>

          <Link to={ROUTE_PATH.CATEGORY_DETAIL(product?.category?.slug)}>
            <p className="text-[#999] text-sm font-light hover:text-primary">{product?.category?.name}</p>
          </Link>

          <p className="text-sm font-light">/</p>

          <p className="text-sm font-light">{product?.name}</p>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] py-8">
        <WrapperContent className="bg-white pt-2 px-2 pb-20">
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-4">
              <div
                style={{ backgroundImage: `url(${product?.image})` }}
                className="pt-[100%] bg-no-repeat bg-center bg-cover"
              ></div>
            </div>

            <div className="col-span-8">
              <h1 className="font-light text-[28px]">{product?.name}</h1>

              <div className="grid grid-cols-12 gap-x-2 mt-2">
                <div className="col-span-7">
                  <div className="flex gap-x-0.5">
                    {[...Array(3)].map((_, index) => (
                      <FaStar key={index} className="text-[#ffbe00]" />
                    ))}
                    {[...Array(2)].map((_, index) => (
                      <FaRegStar key={index} className="text-[#ffbe00]" />
                    ))}
                  </div>

                  <div className="text-sm mt-2 flex items-center gap-x-2">
                    <p>
                      Thương hiệu:
                      <span className="text-primary"> DEMO</span>
                    </p>

                    <span className="w-[1px] bg-[#999] h-3"></span>

                    <p>
                      Tình trạng:
                      <span className="text-primary"> {product?.sold > 0 ? "Còn hàng" : "Hết hàng"}</span>
                    </p>
                  </div>

                  <div className="mt-2 bg-[#f1f1f1] px-4 py-[10px] rounded text-[#f3283d] text-3xl font-semibold">
                    {formatPrice(product?.price)}
                  </div>

                  <div className="mt-4 border-b pb-2 border-b-[#eee]">
                    {product?.description || "Mô tả đang cập nhật"}
                  </div>

                  <div className="mt-4">
                    <p>Số lượng:</p>

                    <div className="flex h-[30px] mt-2">
                      <button
                        onClick={() => {
                          const nextQuantity = quantity - 1;
                          nextQuantity > 0 && setQuantity(nextQuantity);
                        }}
                        className="px-4 border-t border-l border-b border-[#ced4da] rounded-tl-md rounded-bl-md"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className={classNames(
                          "px-3 border border-[#ced4da] text-[#495057] outline-none w-16 text-center [&:focus]:border-[#fbd947]",
                          styles.inputField,
                        )}
                        value={quantity}
                        onChange={(e) => {
                          const value = e.target.value;

                          setQuantity(value);
                        }}
                      />
                      <button
                        onClick={() => setQuantity((prev) => +prev + 1)}
                        className="px-4 border-t border-r border-b border-[#ced4da] rounded-tr-md rounded-br-md"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={onAddCart}
                    className="w-[300px] h-12 text-center rounded text-sm font-semibold uppercase bg-primary border-none outline-none text-white mt-4 [&:hover]:brightness-[1.2] transition-all"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>

                <div className="col-span-5">
                  <div className="border border-primary p-2 rounded-lg">
                    <h2 className="text-xl font-medium mb-4">Chất lượng tạo niềm tin</h2>

                    <div className="flex items-center gap-x-4 mb-2">
                      <img src="/images/policy_product_image_1.png" alt="" className="w-8 h-8 object-contain" />

                      <p>Giao Hàng Nhanh</p>
                    </div>
                    <div className="flex items-center gap-x-4 mb-2">
                      <img src="/images/policy_product_image_2.png" alt="" className="w-8 h-8 object-contain" />

                      <p>100% Sản Phẩm Chính Hiệu</p>
                    </div>
                    <div className="flex items-center gap-x-4 mb-2">
                      <img src="/images/policy_product_image_3.png" alt="" className="w-8 h-8 object-contain" />

                      <p>SP Có trên Shopee - Lazada - Sendo - Tiki</p>
                    </div>
                    <div className="flex items-center gap-x-4 mb-2">
                      <img src="/images/policy_product_image_4.png" alt="" className="w-8 h-8 object-contain" />

                      <p>Phụ Tùng Giá Thương Mại</p>
                    </div>
                  </div>

                  <a href="">
                    <img src="/images/product_trustbadge.jpeg" alt="" className="h-[70px] mt-4" />
                  </a>

                  <div className="mt-4">
                    <div className="flex items-center gap-x-2">
                      <BsFillTagFill className="text-primary" />

                      <div>
                        <span>Có</span>
                        <strong> {product?.sold} </strong>
                        <span>lượt mua sản phẩm</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <IoEye className="text-[#157ffc]" />

                      <div>
                        <span>Có</span>
                        <strong> {product?.view} </strong>
                        <span>lượt xem sản phẩm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4]">
        <WrapperContent className="mt-4 grid grid-cols-12 gap-x-4">
          <div className="col-span-8">
            <div className="bg-white p-2 rounded">
              <h2 className="text-[22px] font-medium pb-2 border-b border-b-[#eee]">Mô tả sản phẩm</h2>

              <div className="mt-2 mb-4">{product?.description || "Mô tả sản phẩm đang được cập nhật"}</div>
            </div>

            <div className="bg-white p-2 rounded mt-8">
              <h2 className="text-[22px] font-medium pb-2 border-b border-b-[#eee]">Khách hàng nhận xét</h2>

              <div className="mt-4 border border-[#c4cdd5] bg-[#e7eefe] px-8 py-8 flex gap-x-4">
                <div className="w-1/3 text-center text-[30px] text-[#0956f0]">
                  <p>5/5</p>
                  <div className="flex gap-x-0.5 justify-center">
                    {[...Array(3)].map((_, index) => (
                      <FaStar key={index} className="text-[#ffbe00] text-lg" />
                    ))}
                    {[...Array(2)].map((_, index) => (
                      <FaRegStar key={index} className="text-[#ffbe00] text-lg" />
                    ))}
                  </div>

                  <p className="text-[#212b35] text-sm mt-2">(999 đánh giá)</p>

                  <button className="bg-[#0956f0] text-white text-sm w-full rounded h-8 mt-4">
                    Gửi đánh giá của bạn
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-4">
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#0956f0] border rounded text-[#0956f0] text-sm">
                      Tất cả
                    </button>
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#c4cdd5] border rounded text-[#212b35] text-sm">
                      5 Điểm (1)
                    </button>
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#c4cdd5] border rounded text-[#212b35] text-sm">
                      5 Điểm (1)
                    </button>
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#c4cdd5] border rounded text-[#212b35] text-sm">
                      5 Điểm (1)
                    </button>
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#c4cdd5] border rounded text-[#212b35] text-sm">
                      5 Điểm (1)
                    </button>
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#c4cdd5] border rounded text-[#212b35] text-sm">
                      5 Điểm (1)
                    </button>
                    <button className="bg-white min-w-[90px] px-2 h-[38px] border-[#c4cdd5] border rounded text-[#212b35] text-sm">
                      Có hình ảnh
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-l border-b border-r border-[#c4cdd5] p-3">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-bold text-[#212b35]">Cường Sinh</p>
                  <div className="flex items-center">
                    {[...Array(3)].map((_, index) => (
                      <FaStar key={index} className="text-[#ffbe00] text-sm" />
                    ))}
                    {[...Array(2)].map((_, index) => (
                      <FaRegStar key={index} className="text-[#ffbe00] text-sm" />
                    ))}
                  </div>
                </div>

                <p className="mt-1 text-sm">Nước làm mất rất oke</p>

                <div className="flex items-center gap-x-4 text-sm text-[#0956f0] mt-2">
                  <p className="cursor-pointer">Gửi trả lời</p>
                  <p className="flex items-center gap-x-1 cursor-pointer">
                    <AiFillLike className="text-[#969b9f]" />
                    Đồng ý
                  </p>
                  <p className="flex items-center gap-x-1 cursor-pointer">
                    <IoIosWarning className="text-[#969b9f]" />
                    Báo cáo sai phạm
                  </p>
                  <p className="text-[#969b9f]">16:44 21/12/2022</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <img src="/images/banner_pro_1.jpeg" alt="" />
          </div>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] mt-6 mb-10">
        <WrapperContent className="bg-white rounded p-2">
          <h2 className="text-[22px] font-medium pb-2 border-b border-b-[#eee]">Sản phẩm cùng loại</h2>

          <div className="grid grid-cols-4 gap-x-3 mt-4 mb-6">
            {productsRelated?.slice(0, 4).map((it) => (
              <ProductItem key={`product-related-${it._id}`} data={it} />
            ))}
          </div>
        </WrapperContent>
      </div>
    </>
  );
};

export default ProductDetail;
