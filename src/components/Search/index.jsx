import React, { useEffect, useState } from "react";
import WrapperContent from "../WrapperContent";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import { FaSearch } from "react-icons/fa";
import ProductItem from "../UI/ProductItem";
import Pagination from "../UI/Pagination";
import productApi from "../../api/productApi";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchStrParam = searchParams.get("name");
  const [searchStr, setSearchStr] = useState();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    searchStrParam && fetchProducts();

    setSearchStr(searchStrParam);
  }, [searchStrParam]);

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getAllProducts({ search: searchStrParam });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
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
      <div className="bg-[#eee]">
        <WrapperContent className="flex items-center py-3 gap-x-2">
          <Link to={ROUTE_PATH.HOME}>
            <p className="text-[#999] text-sm font-light hover:text-primary">Trang chủ</p>
          </Link>

          <p className="text-sm font-light">/</p>

          <p className="text-sm font-light">Tìm kiếm</p>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] py-8">
        {products.length > 0 ? (
          <WrapperContent className="bg-white p-2">
            <p>Có {products.length} kết quả tìm kiếm phù hợp</p>

            <div className="mt-4 grid grid-cols-5 gap-4">
              {products?.map((product) => (
                <ProductItem key={`product-item-${product._id}`} data={product} />
              ))}
            </div>

            <Pagination className="my-4" />
          </WrapperContent>
        ) : (
          <WrapperContent className="bg-white rounded-md py-8 text-center">
            <div className="max-w-[530px] mx-auto">
              <p className="text-[22px]">Nhập từ khoá để tìm kiếm</p>

              <form action="" className="w-[400px] ml-14 h-10 flex items-center my-10" onSubmit={onSubmitSearch}>
                <input
                  type="text"
                  name=""
                  id=""
                  className="h-10 flex-1 px-4 rounded-tl-md rounded-bl-md outline-none border-r-0 border-l border-t border-b border-[#eee]"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchStr}
                  onChange={onSearchChange}
                />
                <button className="bg-[#ffe10e] h-full px-4 rounded-tr-md rounded-br-md">
                  <FaSearch className="text-white" />
                </button>
              </form>

              <p className="text-sm uppercase">Không tìm thấy bất kỳ kết quả nào với từ khóa trên.</p>
            </div>
          </WrapperContent>
        )}
      </div>
    </>
  );
};

export default Search;
