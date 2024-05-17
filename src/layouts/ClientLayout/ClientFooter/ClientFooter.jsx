import React from "react";
import WrapperContent from "../../../components/WrapperContent";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../../constant/route";
import { FaBehance, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

const ClientFooter = () => {
  return (
    <>
      <div className="pt-8 pb-10 bg-[#f7f7f7] text-center">
        <p className="text-2xl font-medium">Đăng ký nhận tin</p>

        <form action="" className="w-[400px] max-w-full mt-2 h-10 inline-flex items-center mx-auto">
          <input
            type="text"
            name=""
            id=""
            className="h-10 flex-1 px-4 rounded-tl-md rounded-bl-md outline-none border-none"
            placeholder="Nhập địa chỉ email"
          />
          <button className="bg-[#ffe10e] h-full px-4 rounded-tr-md rounded-br-md">Đăng ký</button>
        </form>
      </div>

      <div className="py-10 bg-white">
        <WrapperContent>
          <div className="grid grid-cols-4 gap-x-4">
            <div>
              <h4 className="font-bold uppercase">TPT AUTO PARTS</h4>

              <Link to={ROUTE_PATH.HOME} className="my-2 block">
                <img src="/images/vinhkiet-auto-logo.jpg" alt="" className="h-14" />
              </Link>

              <p>CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ TPT | MST : 0317 258 181</p>

              <ul className="mt-4 text-sm">
                <li className="mb-1">Địa chỉ: 47E Đội Cung P.11 Q.11 TP.HCM</li>
                <li className="mb-1">
                  Số điện thoại:
                  <a href="tel:0983983983" className="hover:text-primary">
                    {" "}
                    0983983983
                  </a>
                </li>
                <li className="mb-1">
                  Email:
                  <a href="mailto:info@phutungototpt.vn" className="hover:text-primary">
                    {" "}
                    info@phutungototpt.vn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase">Chính sách mua hàng</h4>

              <ul className="mt-4 text-sm">
                <li className="mb-1">
                  <Link to="" className="hover:text-primary">
                    Chính sách thanh toán
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="" className="hover:text-primary">
                    Chính sách bảo mật thông tin khách hàng
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="" className="hover:text-primary">
                    Chính sách vận chuyển, giao nhận hàng hoá
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="" className="hover:text-primary">
                    Chính sách bảo hành sản phẩm
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="" className="hover:text-primary">
                    Chính sách đổi trả sản phẩm
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase">Hỗ trợ khách hàng</h4>

              <ul className="mt-4 text-sm">
                <li className="mb-1">
                  <a href="" target="_blank" className="hover:text-primary">
                    ZALO/VIBER/INSTAGRAM/FACEBOOK
                  </a>
                </li>
                <li className="mb-1">
                  <a href="" target="_blank" className="hover:text-primary">
                    CSKH 01: 0917.721.910
                  </a>
                </li>
                <li className="mb-1">
                  <a href="" target="_blank" className="hover:text-primary">
                    CSKH 02: 0919.070.910
                  </a>
                </li>
                <li className="mb-1">
                  <a href="" target="_blank" className="hover:text-primary">
                    Hỗ trợ kỹ thuật: 0915.081.910
                  </a>
                </li>
                <li className="mb-1">
                  <a href="" target="_blank" className="hover:text-primary">
                    Chính sách đổi trả sản phẩm
                  </a>
                </li>
              </ul>

              <a
                href="https://www.dmca.com/Protection/Status.aspx?ID=3f19bb19-642f-46f4-bcc6-3d8f75aa2c98&refurl=https://phutungototpt.vn/"
                target="_blank"
              >
                <img src="/images/dmca_protected.png" alt="" className="h-10 mt-4" />
              </a>
            </div>

            <div>
              <h4 className="font-bold uppercase">Theo dõi chúng tôi</h4>

              <div className="mt-4 flex items-center gap-x-4">
                <a href="" target="_blank">
                  <FaFacebookSquare className="text-3xl text-primary" />
                </a>
                <a href="" target="_blank">
                  <FaTwitter className="text-3xl text-primary" />
                </a>
                <a href="" target="_blank">
                  <FaBehance className="text-3xl text-primary" />
                </a>
                <a href="" target="_blank">
                  <FaInstagram className="text-3xl text-primary" />
                </a>
              </div>

              <h4 className="font-bold uppercase mt-6">Phương thức thanh toán</h4>

              <a href="">
                <img src="/images/footer_trustbadge.png" alt="" className="h-20 mt-2" />
              </a>

              <a href="http://online.gov.vn/Home/WebDetails/97380?AspxAutoDetectCookieSupport=1" target="_blank">
                <img src="/images/logo_bct.png" alt="" className="h-[75px] mt-4" />
              </a>
            </div>
          </div>

          <p className="text-sm text-center mt-6">
            © Bản quyền thuộc về Phụ Tùng ô tô TPT | Cung cấp bởi TPT Auto Parts
          </p>
        </WrapperContent>
      </div>
    </>
  );
};

export default ClientFooter;
