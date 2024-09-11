import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import dotenv from dotenv

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.email_pass,
  },
});

export const delivery_notification = async (userid, paqueteria, guia) => {
  try {
    const user_info = await User.findById(userid);

    if (!user_info) {
      throw new Error("Usuario no encontrado");
    }

    await transporter.sendMail({
      from: '"MotoARS" <motoarsbussines@gmail.com>', // Dirección del remitente
      to: user_info.email, // Lista de destinatarios
      subject: "Hemos enviado tu paquete", // Asunto del correo
      html: `
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notificación de envío</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .email-header {
      text-align: center;
      background-color: #4CAF50;
      padding: 20px;
      border-radius: 10px 10px 0 0;
      color: white;
    }

    .email-header h1 {
      margin: 0;
    }

    .email-body {
      padding: 20px;
      color: #333333;
    }

    .email-body h2 {
      color: #4CAF50;
      font-size: 24px;
    }

    .email-body p {
      line-height: 1.6;
      font-size: 16px;
      margin: 10px 0;
    }

    .email-footer {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      color: #888888;
      font-size: 14px;
      border-radius: 0 0 10px 10px;
    }

    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }

    .track-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
    }

    .track-button:hover {
      background-color: #45a049;
    }

    .email-logo {
      width: 100px;
      margin: 0 auto;
    }

    .package-details {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }

    .package-details p {
      margin: 5px 0;
    }

    .signature {
      margin-top: 30px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header del correo -->
    <div class="email-header">
      <h1>MotoARS</h1>
    </div>

    <!-- Cuerpo del correo -->
    <div class="email-body">
      <h2>¡Tu pedido está en camino!</h2>
      <p>Hola <strong>${user_info.username}</strong>,</p>
      <p>Nos complace informarte que hemos enviado tu paquete. A continuación te damos los detalles de tu envío:</p>
      
      <!-- Detalles del paquete -->
      <div class="package-details">
        <p><strong>Paquetería:</strong> ${paqueteria}</p>
        <p><strong>Número de guía:</strong> ${guia}</p>
      </div>

      <p>Puedes rastrear tu paquete utilizando la pagina de la paqueteria</p>

      <p class="signature">Gracias por confiar en nosotros,<br>El equipo de MotoARS.</p>
    </div>

    <!-- Pie del correo -->
    <div class="email-footer">
      <p>Si tienes alguna pregunta, no dudes en <a href="mailto:motoarsbussines@gmail.com">contactarnos</a>.</p>
      <p>&copy; 2024 MotoARS. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
   
      `,
    });
    console.log("Correo de notificación enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

export const payment_notification = async (userid, orderId, items, total) => {
  const itemsHTML = items
    .map(
      (item) => `
    <p><strong>Nombre:</strong> ${item.product_name}</p>
    <p><strong>Cantidad:</strong> ${item.cantidad}</p>
    <p><strong>Precio:</strong> $${item.amount}</p>
    <hr />
  `
    )
    .join("");

  try {
    const user_info = await User.findById(userid);

    if (!user_info) {
      throw new Error("Usuario no encontrado");
    }

    await transporter.sendMail({
      from: '"MotoARS" <motoarsbussines@gmail.com>', // Dirección del remitente
      to: user_info.email, // Lista de destinatarios
      subject: "Gracias por tu compra", // Asunto del correo
      html: `
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notificación de envío</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            background-color: #4CAF50;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            color: white;
          }
          .email-header h1 {
            margin: 0;
          }
          .email-body {
            padding: 20px;
            color: #333333;
          }
          .email-body h2 {
            color: #4CAF50;
            font-size: 24px;
          }
          .email-body p {
            line-height: 1.6;
            font-size: 16px;
            margin: 10px 0;
          }
          .email-footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            color: #888888;
            font-size: 14px;
            border-radius: 0 0 10px 10px;
          }
          .email-footer a {
            color: #4CAF50;
            text-decoration: none;
          }
          .track-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
          }
          .track-button:hover {
            background-color: #45a049;
          }
          .email-logo {
            width: 100px;
            margin: 0 auto;
          }
          .package-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .package-details p {
            margin: 5px 0;
          }
          .signature {
            margin-top: 30px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header del correo -->
          <div class="email-header">
            <h1>MotoARS</h1>
          </div>

          <!-- Cuerpo del correo -->
          <div class="email-body">
            <h2>¡Gracias por tu compra!</h2>
            <p>Hola <strong>${user_info.username}</strong>,</p>
            <p>Nos complace informarte que hemos validado tu pago. A continuación te damos los detalles de tu compra:</p>
            
            <!-- Detalles del paquete -->
            <div class="package-details">
              <p><strong>Número de orden:</strong> ${orderId}</p>
              <p><strong>Artículos:</strong></p>
              ${itemsHTML}
              <p>Total: ${total}</p>
            </div>

            <p>Ya empezamos a preparar tu pedido, recibirás un correo para que puedas rastrear tu envío.</p>

            <p class="signature">Gracias por confiar en nosotros,<br>El equipo de MotoARS.</p>
          </div>

          <!-- Pie del correo -->
          <div class="email-footer">
            <p>Si tienes alguna pregunta, no dudes en <a href="mailto:motoarsbussines@gmail.com">contactarnos</a>.</p>
            <p>&copy; 2024 MotoARS. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    });
    console.log("Correo de notificación enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};
