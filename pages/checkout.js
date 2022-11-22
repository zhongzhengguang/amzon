import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckOutProducts from "../Components/CheckOutProducts";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function checkout() {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const total = useSelector(selectTotal);

  const stripePromise = loadStripe(process.env.stripe_public_key);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    //  Call the backend to create a checkout session = 調用後端創建結帳頁面
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    // Redirect user to stripe checkout = 將用戶重新定為位到結帳
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className=" bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className=" flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1500}
            height={250}
            alt="/"
          />
          <div className=" flex flex-col p-5 space-y-10 bg-white">
            <h1 className=" text-3xl border-b pb-4">
              {items.length == 0
                ? "Your shopping basket are empty"
                : "shopping basket"}
            </h1>
            {items.map((item, i) => (
              <CheckOutProducts
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        <div className=" flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className=" whitespace-nowrap">
                Total({items.length} items):
                <span className=" font-bold">NT$ {total}</span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to check out" : "Proceed to check out"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
