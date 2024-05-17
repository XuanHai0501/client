import React from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";

import ProductItem from "../../UI/ProductItem";
import { FaChevronRight } from "react-icons/fa";
import { ROUTE_PATH } from "../../../constant/route";

const CategorySection = ({ isShowImage = false, data }) => {
  return (
    <WrapperContent className="mb-8 bg-white rounded-lg p-2">
      <div className="border-b border-b-[#eee] pb-2 pt-1">
        <Link to={ROUTE_PATH.CATEGORY_DETAIL(data?.slug)} className="inline-block">
          <p className="font-semibold text-[22px]">{data.name}</p>
        </Link>
      </div>

      <div className="grid grid-cols-5 my-4 gap-x-3">
        {isShowImage && (
          <div className="col-span-2">
            <img src={data.image} alt="" className="h-[290px] w-full object-cover" />
          </div>
        )}

        {data?.products?.slice(0, isShowImage ? 3 : 5)?.map((product) => (
          <ProductItem key={`product-item-${product._id}`} data={product} className="col-span-1" />
        ))}
      </div>

      <div className="text-center mb-4 mt-6">
        <Link to={ROUTE_PATH.CATEGORY_DETAIL(data?.slug)} className="inline-block">
          <button className="group hover:bg-primary transition-all px-3 py-[6px] border border-primary rounded flex items-center gap-x-1">
            <p className="text-primary group-hover:text-white transition-all">Xem tất cả</p>
            <FaChevronRight className="text-primary group-hover:text-white transition-all" />
          </button>
        </Link>
      </div>
    </WrapperContent>
  );
};

export default CategorySection;
