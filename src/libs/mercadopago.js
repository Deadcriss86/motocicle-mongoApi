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
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default router;

// const token_mp = process.env.Mercadopago_token;
// const client = new MercadoPagoConfig({ accessToken: token_mp });

// router.post("/compra", async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "La solicitud debe incluir un array de productos" });
//     }

//     const preference = {
//       body: {
//         items: items.map((item) => ({
//           title: item.title,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//           description: item.description,
//         })),
//       },
//     };

//     const preferenceInstance = new Preference(client);
//     const response = await preferenceInstance.create(preference);
//     console.log(response);
//     console.log(response.sandbox_init_point);
//     res.json({ url: response.sandbox_init_point });
//   } catch (error) {
//     console.error("Error al crear la preferencia:", error);
//     res.status(500).json({ error: "Error al crear la preferencia" });
//   }
// });

// router.post("/compra/noti", async (req, res) => {
//   const id = String(req.body.data.id);
//   console.log(id);

//   try {
//     const payment = await new Payment(client);
//     const paymentResponse = await payment.get({
//       id: id,
//     });
//     console.log(paymentResponse);
//     res.json({ message: "Success" });
//   } catch (error) {
//     console.error("Error fetching payment:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/compra/noti", async (req, res) => {
//   try {
//     console.log(req.body); // Usa req en lugar de request
//     res.json({ message: "Success" });
//   } catch (error) {
//     console.error(error); // Usa console.error para errores
//     res.status(500).json({ error: "Internal Server Error" }); // Agrega una respuesta en caso de error
//   }
// });
