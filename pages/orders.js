import React from "react";
import Header from "../Components/Header";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

function orders({ orders }) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  console.log(stripe);

  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <main className=" max-w-screen-lg mx-auto p-10">
        <h1 className=" text-3xl border-b border-yellow-400">Your Orders</h1>
        {session ? (
          <h2>X Orders</h2>
        ) : (
          <h2>Please sign in to see your Orders</h2>
        )}
        <div className=" mt-5 space-y-4"></div>
      </main>
    </div>
  );
}

export default orders;

export async function getSeverSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  console.log(stripe);
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  // const stripeOrders = await db
  //   .collection("userS")
  //   .doc(session.user.email)
  //   .collection("orders")
  //   .orderBy("timestamp", "desc")
  //   .get();
  // const orders = await Promise.all(
  //   stripeOrders.docs.map(async (order) => ({
  //     id: order.id,
  //     amount: order.data().amount_shipping,
  //     images: order.data().images,
  //     timestamp: moment(order.data().timestamp.toDate()).unix(),
  //     items: await stripe.checkout.session.listLineItem(order.id, {
  //       limit: 100,
  //     }).data,
  //   }))
  // );
  // return {
  //   props: {
  //     orders,
  //   },
  // };
}
