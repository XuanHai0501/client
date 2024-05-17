import React, { useEffect, useState } from "react";
import WrapperContent from "../WrapperContent";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Slider from "./Slider/Slider";
import CategorySection from "./CategorySection";
import LatestNews from "./LatestNews";
import categoryApi from "../../api/categoryApi";
import { ROUTE_PATH } from "../../constant/route";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesHomePage, setCategoriesHomePage] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();
      setCategories(data);

      const { data: categoriesHome } = await categoryApi.getAllCategory({ isShowHome: true });
      setCategoriesHomePage(categoriesHome);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <WrapperContent className="flex h-[365px] max-h-[365px] relative">
          <div className="w-[275px] bg-white border border-[#e1e1e1] overflow-y-auto overflow-x-hidden">
            {categories?.map((it) => (
              <div
                key={`category-item-${it._id}`}
                className="flex items-center justify-between px-4 py-2 hover:bg-[#f8f9fa] cursor-pointer group"
              >
                <Link to={ROUTE_PATH.CATEGORY_DETAIL(it?.slug)}>
                  <p className="group-hover:text-primary">{it.name}</p>
                </Link>

                <FaChevronRight className="group-hover:text-primary" />

                <div className="border absolute left-[275px] z-10 top-0 bottom-0 hidden bg-white group-hover:block p-3 right-0">
                  <div className="grid grid-cols-3 gap-2">
                    {it.subCategories?.map((sub) => (
                      <div key={`sub-cate-${sub._id}`}>
                        <Link to={ROUTE_PATH.CATEGORY_DETAIL(sub?.slug)} className="inline-block">
                          <p className="hover:text-primary text-sm font-bold">{sub.name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            <Slider />
          </div>
        </WrapperContent>
      </div>

      <WrapperContent className="grid grid-cols-4 my-10">
        <img src="/images/brand_1.png" alt="Brand 1" />
        <img src="/images/brand_2.png" alt="Brand 2" />
        <img src="/images/brand_3.png" alt="Brand 3" />
        <img src="/images/brand_4.png" alt="Brand 4" />
      </WrapperContent>

      {categoriesHomePage?.map((it) => (
        <CategorySection key={`category-item-${it._id}`} data={it} />
      ))}

      <LatestNews />
    </>
  );
};

export default Home;
