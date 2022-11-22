import { buffer } from "micro";
import * as admin from "firebase-admin";
const serviceAccount = require("../../permission.json");
//   不讓系統initial兩次
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
//   Entablish connection to stripe = 與stripe 建立連接
const stripe = require("stripe")(process.eventNames.STRIPE_SIGNING_SECRET);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fulfullOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Sucess:Order ${session.id} had been added to thr database`);
    });
};
export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;

    // Verify that the Event posted came from stripe = 驗證
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("error", err.message);
      return res.status(400).send(`webhook error:${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.tyoe === "checkout.session.completed") {
      const session = event.data.object;

      return fulfullOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Error:${err.message}`));
    }
  }
};
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
