import Image from "next/image";
import React from "react";
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center justify-between bg-gray-900 p-2 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <img
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width="90"
            height="40"
            alt="/"
          />
        </div>
        <div className="mx-10 bg-yellow-400 hover:bg-yellow-500 hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
          <input
            className=" p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            //  focus:outline-none 讓input外面藍色框框變不見
            type="text"
          />
          <SearchIcon className=" h-12 p-4" />
        </div>
        <div className=" text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <button
            className=" link cursor-pointer "
            onClick={!session ? () => signIn() : () => signOut()}
          >
            <p>{session ? `Hello , ${session.user.name}` : "signIn"}</p>
            <p className=" font-extrabold md:text-sm">Account & list</p>
          </button>
          <div className=" link">
            <p>returns</p>
            <p className=" font-extrabold md:text-sm">& order</p>
          </div>
          <div
            className=" relative flex items-center link"
            onClick={() => router.push("checkout")}
          >
            <span className=" absolute top-0 right-0 md:right-11 h-4 w-4 bg-yellow-400 text-center rounded-full font-bold text-black">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      <div className=" flex items-center bg-gray-800 text-white text-sm space-x-3 p-2 pl-6">
        <p className=" link flex items-center">
          <MenuIcon className=" h-6 mr-1" />
          All
        </p>
        <p className=" link ">Prime Video</p>
        <p className=" link ">Amazon Business</p>
        <p className=" link ">Today Deal </p>
        <p className=" link hidden lg:inline-flex ">Electronic</p>
        <p className=" link hidden lg:inline-flex ">Food & Grocery</p>
        <p className=" link hidden lg:inline-flex ">Prime</p>
        <p className=" link hidden lg:inline-flex ">Buy Again</p>
        <p className=" link hidden lg:inline-flex ">Shopper Toolkit</p>
        <p className=" link hidden lg:inline-flex ">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
