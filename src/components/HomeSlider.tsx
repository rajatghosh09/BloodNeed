"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import hero1 from "../../public/banner/hero1.jpg"
import hero2 from "../../public/banner/hero2.jpg"
import hero3 from "../../assets/hero3.jpg"
import Image from "next/image";




const HomeSlider = () => {
    return (
        <section className="home-slider relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <div className="relative w-full h-[80vh]">
                        <Image
                            src={hero1}
                            alt="Hero Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-[80vh]">
                        <Image
                            src={hero2}
                            alt="Hero Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-[80vh]">
                        <Image
                            src={hero3}
                            alt="Hero Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Custom Pagination */}
            <div className="custom-pagination"></div>
        </section>
    );
};

export default HomeSlider;