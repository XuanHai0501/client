import React from "react";

import styles from "./index.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { formatPrice } from "../../../utils/common";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ROUTE_PATH } from "../../../constant/route";

const ProductItem = ({ className, data }) => {
  return (
    <div className={classNames(styles.productItem, "group", className)}>
      <Link
        to={ROUTE_PATH.PRODUCT_DETAIL(data.slug)}
        className="pt-[100%] w-full block bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      ></Link>

      <div className="p-2">
        <Link to={ROUTE_PATH.PRODUCT_DETAIL(data.slug)}>
          <p className="text-sm hover:text-primary line-clamp-2 group-hover:text-primary">{data.name}</p>
        </Link>

        <div className="flex gap-x-0.5 mt-4">
          {[...Array(3)].map((_, index) => (
            <FaStar key={index} className="text-[#ffbe00]" />
          ))}
          {[...Array(2)].map((_, index) => (
            <FaRegStar key={index} className="text-[#ffbe00]" />
          ))}
        </div>

        <p className="mt-1 font-semibold text-[#f3283d]">{formatPrice(data.price)}</p>
      </div>
    </div>
  );
};

export default ProductItem;
