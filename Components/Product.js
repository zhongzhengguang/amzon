import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

function Product({ id, title, price, description, category, image }) {
  //   rating = 評分
  const [rating] = useState(
    3
    // Math.floor(Math.random() * (MAX_RATING.number - MIN_RATING.number + 1)) +
    //   MIN_RATING.number
  );

  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div key={id} className=" flex relative flex-col m-5 bg-white z-30 p-10">
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className=" flex h-[300px] w-full bg-black">
        <img src={image} className="w-full h-full" />
      </div>
      <h4>{title}</h4>
      <div className="flex">
        {/* 牛逼 */}
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className=" h-5 text-yellow-500" />
          ))}
      </div>
      <p className=" text-xs my-2 line-clamp-2">{description}</p>
      <div>{price}</div>
      {hasPrime && (
        <div className="flex items-center space-x-2 ">
          <img
            className=" w-12"
            src="https://links.papareact.com/fdw"
            alt="/"
          />
          <p className=" text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button className=" mt-auto button">Add to basket</button>
    </div>
  );
}

export default Product;
