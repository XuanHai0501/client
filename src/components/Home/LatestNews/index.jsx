import React from "react";
import WrapperContent from "../../WrapperContent";
import { Link } from "react-router-dom";

import ProductItem from "../../UI/ProductItem";
import { FaChevronRight } from "react-icons/fa";

import styles from "./index.module.css";

const NewsItem = () => {
  return (
    <div className={styles.newsItem}>
      <Link>
        <img src="https://picsum.photos/400/400" alt="" className="w-[100px] h-[100px] object-cover" />
      </Link>

      <div className="flex-1">
        <Link className="inline-block">
          <h2 className="text-xl hover:text-primary">Dây curoa ô tô và dấu hiệu cảnh báo không nên bỏ qua</h2>
        </Link>

        <div className="flex items-center gap-x-4 mt-2 mb-2">
          <p className="text-xs">Nguyễn Hoàng Tường Vy</p>
          <p className="text-[10px] text-[#6c757d]">Thứ Sáu, 03/02/2023</p>
        </div>

        <p className="text-sm font-light line-clamp-2">
          Dây curoa là một phụ kiện được ứng dụng rộng rãi trong nhiều lĩnh vực của cuộc sống, đặc biệt là ngành chế tạo
          ô tô, xe máy. Vậy cụ thể dây curoa là gì và gồm những loại nào? Làm thế nào để tính chu vi dây mà không cần
          phải đọc thông số ghi trên dây? Và hiện nay giá bán dao động ở mức nào?
        </p>
      </div>
    </div>
  );
};

const LatestNews = () => {
  return (
    <WrapperContent className="mb-8 bg-white rounded-lg p-2">
      <div className="border-b border-b-[#eee] pb-2 pt-1 flex items-center justify-between">
        <Link to="/" className="inline-block">
          <p className="font-semibold text-[22px]">Tin tức mới nhất</p>
        </Link>

        <Link className="flex items-center text-primary gap-x-1">
          <p>Xem tất cả</p>
          <FaChevronRight />
        </Link>
      </div>

      <div className="flex mt-3 gap-x-4">
        <div className="w-2/5 border-r border-r-[#f7f7f7] pr-4">
          <img src="/images/news_1.jpeg" alt="" className="h-[195px]" />

          <div className="py-5">
            <Link className="inline-block">
              <p className="hover:text-primary text-xl">Phụ Tùng Ô Tô TPT Khuyến Mãi Valentine 2023</p>
            </Link>

            <p className="text-xs pt-2 pb-1">Nguyễn Hoàng Tường Vy</p>
            <p className="text-[10px] text-[#6c757d] mb-2">Thứ Sáu, 03/02/2023</p>
            <p>
              Trong dịp lễ Valentine năm nay, Phụ tùng ô tô TPT sẽ dành tặng khách hàng chương trình "Valentine's Day!
              Yêu thương nhân đôi - Gấp đôi...
            </p>
          </div>
        </div>

        <div className="w-3/5 max-h-[350px] overflow-y-auto">
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
      </div>
    </WrapperContent>
  );
};

export default LatestNews;
