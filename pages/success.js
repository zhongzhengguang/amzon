import React from "react";
import Header from "../Components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function sucess() {
  const router = useRouter();
  return (
    <div className=" bg-gray-100">
      <Header />
      <main className=" max-w-screen-lg mx-auto">
        <div className=" flex flex-col p-10">
          <div className=" flex items-center space-x-2 mb-5">
            <CheckCircleIcon className=" text-green-500 h-10" />
            <h1 className=" text-3xl">
              Thanks you , your Order has been confirmied
            </h1>
          </div>
          <p>
            There are a lot of ways to say thank you, and some are better than
            others. In order to sound as thankful as you are, your thank you
            should be sincere, warm, and personalized.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my Order
          </button>
        </div>
      </main>
    </div>
  );
}

export default sucess;
