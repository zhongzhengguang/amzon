import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const data = [
  {
    id: 1,
    img: "https://links.papareact.com/gi1",
  },
  {
    id: 2,
    img: "https://links.papareact.com/6ff",
  },
  {
    id: 3,
    img: "https://links.papareact.com/7ma",
  },
];

function Banner() {
  return (
    <div className=" relative">
      <div className=" absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {data.map((items) => (
          <div key={items.id}>
            <img loading="lazy" src={items.img} alt="/" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
