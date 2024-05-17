import React, { useEffect, useState } from "react";
import WrapperContent from "../WrapperContent";
import { Link, useParams } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/route";
import CategorySection from "../Home/CategorySection";
import ProductItem from "../UI/ProductItem";
import Pagination from "../UI/Pagination";
import categoryApi from "../../api/categoryApi";

const Category = () => {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    params?.categorySlug && fetchData();
  }, [params?.categorySlug]);

  const fetchData = async () => {
    try {
      const { data } = await categoryApi.getCategory(params?.categorySlug);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="bg-[#eee]">
        <WrapperContent className="flex items-center py-3 gap-x-2">
          <Link to={ROUTE_PATH.HOME}>
            <p className="text-[#999] text-sm font-light hover:text-primary">Trang chủ</p>
          </Link>

          <p className="text-sm font-light">/</p>

          <p className="text-sm font-light">{data?.category?.name}</p>
        </WrapperContent>
      </div>

      <div className="bg-[#f4f4f4] py-8">
        {data?.category?.parentId ? (
          <WrapperContent>
            <div className="bg-white p-2">
              <h1 className="text-[22px] mb-2">{data?.category?.name}</h1>

              <div className="border-b border-b-[#dee2e6] pb-2 flex items-center gap-x-4">
                <p>Sắp xếp:</p>

                <p className="text-[#898989] cursor-pointer hover:text-primary">Tên A → Z</p>
                <p className="text-[#898989] cursor-pointer hover:text-primary">Tên Z → A</p>
                <p className="text-[#898989] cursor-pointer hover:text-primary">Giá tăng dần</p>
                <p className="text-[#898989] cursor-pointer hover:text-primary">Giá giảm dần</p>
              </div>

              <div className="grid grid-cols-5 gap-4 mt-4">
                {data?.products?.map((product) => (
                  <ProductItem key={`product-item-${product?._id}`} data={product} />
                ))}
              </div>

              <Pagination />
            </div>
          </WrapperContent>
        ) : (
          data?.subCategories?.map((it) => <CategorySection key={`category-item-${it?._id}`} data={it} isShowImage />)
        )}
      </div>
    </>
  );
};

export default Category;
