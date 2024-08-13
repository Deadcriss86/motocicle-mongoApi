import { response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const mercadopago = async (req, res) => {
  const client = new MercadoPagoConfig({
    accessToken:
      "APP_USR-2285472781265467-080715-9e0b889824a3d4e398e54df42ef4501c-1933439525",
  });
  const preference = new Preference(client);

  preference
    .create({
      body: {
        payment_methods: {
          excluded_payment_methods: [
            {
              id: "amex",
            },
            {
              id: "redcompra",
            },
          ],
          excluded_payment_types: [],
          installments: 1,
        },
        back_urls: {
          success: "http://localhost:3000/",
        },
        items: [
          {
            title: "My product",
            quantity: 1,
            unit_price: 2000,
          },
        ],
      },
    })
    .then(console.log)
    .catch(console.log);
};
