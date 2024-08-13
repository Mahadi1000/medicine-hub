"use client"
import React from "react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
const Slider = () => {
  return (
    <div>
      <Swiper
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="rounded-md overflow-hidden   md:banner">
            <img
              className="h-full w-full"
              src="https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2Fcontent-21.png&w=1920&q=100"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md overflow-hidden  md:banner">
            <img
              className="h-full w-full"
              src="https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2Fcontent-22.png&w=1920&q=100"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-md overflow-hidden  md:banner">
            <img
              className="h-full w-full"
              src="https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2Fcontent-21.png&w=1920&q=100"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
