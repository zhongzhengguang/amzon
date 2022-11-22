const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.get;
