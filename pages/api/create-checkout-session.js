const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  // console.log(items);
  // console.log(email);
  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "TWD",
      unit_amount: item.price * 100,
      product_data: {
        description: item.description,
        name: item.title,
        images: [item.image],
      },
    },
  }));
  // console.log(transformedItems[0].price_data);
  // console.log(res.status);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_rates: ["shr_1M5keOGfRilHDNh4XZo5nj27"], error - StripeInvalidRequestError: Invalid object
    shipping_address_collection: {
      allowed_countries: ["TW", "US"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({
    id: session.id,
  });
};
