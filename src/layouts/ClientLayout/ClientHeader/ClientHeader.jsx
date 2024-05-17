import React, { useState } from "react";
import WrapperContent from "../../../components/WrapperContent";
import { FaSearch, FaPhoneAlt, FaUser, FaShoppingCart, FaBars, FaRegStar } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../constant/route";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN_STORAGE_KEY } from "../../../constant/common";
import { resetCart } from "../../../store/cartSlice";

const ClientHeader = () => {
  const [searchStr, setSearchStr] = useState("");
  const navigate = useNavigate();

  const { isLogged, userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    dispatch(resetCart());

    window.location.href = ROUTE_PATH.SIGN_IN;
  };

  const onSearchChange = (e) => {
    const value = e.target.value;

    setSearchStr(value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();

    if (searchStr.trim().length) {
      navigate(ROUTE_PATH.SEARCH_PRODUCT + "/?name=" + searchStr);
    }
  };

  return (
    <>
      <div className="bg-[#fd7801] py-4">
        <WrapperContent>
          <div className="flex items-center">
            <Link to={ROUTE_PATH.HOME}>
              <img src="/images/vinhkiet-auto-logo.jpg" alt="Logo" className="h-14" />
            </Link>

            <form action="" className="w-[400px] ml-14 h-10 flex items-center" onSubmit={onSubmitSearch}>
              <input
                type="text"
                name=""
                id=""
                className="h-10 flex-1 px-4 rounded-tl-md rounded-bl-md outline-none border-none"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchStr}
                onChange={onSearchChange}
              />
              <button className="bg-[#ffe10e] h-full px-4 rounded-tr-md rounded-br-md">
                <FaSearch className="text-white" />
              </button>
            </form>

            <div className="flex items-center ml-auto gap-x-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <FaPhoneAlt className="text-[#fd7801] text-xs" />
              </div>

              <div>
                <p className="text-[#e4e1df]">Hỗ trợ khách hàng</p>

                <a href="tel:012345678" className="text-[#e4e1df] font-semibold">
                  012.345.678
                </a>
              </div>
            </div>

            <div className="flex items-center ml-6 gap-x-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <FaUser className="text-[#fd7801] text-xs" />
              </div>

              {isLogged ? (
                <div>
                  <Link to={userInfo.role === "ADMIN" ? ROUTE_PATH.ADMIN : ROUTE_PATH.HOME}>
                    <p className="text-[#e4e1df]">Hi, {userInfo.name}</p>
                  </Link>

                  <button className="text-[#e4e1df] text-sm" onClick={onLogout}>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-[#e4e1df]">Tài khoản</p>

                  <Link to={ROUTE_PATH.SIGN_IN}>
                    <button className="text-[#e4e1df] text-sm">Đăng nhập</button>
                  </Link>
                </div>
              )}
            </div>

            <Link className="ml-4" to={ROUTE_PATH.CART}>
              <div className="flex items-center border border-[#e4e1df] rounded-md h-14 px-2 gap-x-2">
                <FaShoppingCart className="text-[#e4e1df] text-2xl" />
                <p className="text-[#e4e1df]">Giỏ hàng</p>

                <button className="bg-[#ffe10e] text-xs px-1 py-1 rounded font-medium">{products.length}</button>
              </div>
            </Link>
          </div>
        </WrapperContent>
      </div>

      <div className="h-10 flex items-center bg-white">
        <WrapperContent className="flex items-center">
          <div className="flex items-center gap-x-2 w-[275px]">
            <FaBars />
            <p>Danh sách sản phẩm</p>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <FaRegStar />

              <Link to="">
                <p className="hover:text-[#e85933]">Giới Thiệu</p>
              </Link>
            </div>

            <div className="flex items-center gap-x-1">
              <FaNewspaper />

              <Link to="">
                <p className="hover:text-[#e85933]">Tin Tức</p>
              </Link>
            </div>

            <div className="flex items-center gap-x-1">
              <FaPhoneAlt />

              <Link to="">
                <p className="hover:text-[#e85933]">Liên Hệ</p>
              </Link>
            </div>
          </div>
        </WrapperContent>
      </div>
    </>
  );
};

export default ClientHeader;
