"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import hero1 from "../../public/banner/hero1.jpg";
import hero2 from "../../public/banner/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";
import Image from "next/image";

const HomeSlider = () => {
    return (
        <section className="home-slider relative w-full">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full"
            >
                <SwiperSlide>
                    <div className="relative w-full h-[50vh] md:h-[65vh] xl:h-[80vh]">
                        <Image
                            src={hero1}
                            alt="Hero Banner 1"
                            fill
                            className=" object-center"
                            priority 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-[50vh] md:h-[65vh] xl:h-[80vh]">
                        <Image
                            src={hero2}
                            alt="Hero Banner 2"
                            fill
                            className=" object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-[50vh] md:h-[65vh] xl:h-[80vh]">
                        <Image
                            src={hero3}
                            alt="Hero Banner 3"
                            fill
                            className="object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
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