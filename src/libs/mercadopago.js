import { Router } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const router = Router();
const stripe = new Stripe(process.env.Stripe_secret_key);

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return Math.round(total * 100); // Convertir a centavos
};

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items.items),
      currency: "mxn",
      automatic_payment_methods: { enabled: true },
      metadata: { items: JSON.stringify(items) },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default router;
