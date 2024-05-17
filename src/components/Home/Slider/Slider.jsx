import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./slider.css";

const Slider = () => {
  return (
    <Swiper
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="w-full"
      modules={[Autoplay, Navigation]}
      autoplay
      navigation
      loop={true}
    >
      <SwiperSlide>
        <img
          src="https://bizweb.dktcdn.net/100/436/183/themes/833761/assets/slider_1.jpg"
          alt=""
          className="h-full object-cover w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://bizweb.dktcdn.net/100/436/183/themes/833761/assets/slider_2.jpg"
          alt=""
          className="h-full object-cover w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://bizweb.dktcdn.net/100/436/183/themes/833761/assets/slider_3.jpg"
          alt=""
          className="h-full object-cover w-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
