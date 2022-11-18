import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
function CheckOutProducts({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className=" grid grid-cols-5">
      <Image src={image} height={200} width={200} alt="/" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className=" flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className=" text-xs my-2 line-clamp-2">{description}</p>
        <p>NT$ {price}</p>
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
      </div>
      <div className=" flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className=" button">
          Add to basket
        </button>
        <button onClick={removeItemFromBasket} className=" button">
          Remove to basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProducts;
