import Order from "../models/order.model.js";

export const reviewcheck = async (req, res, next) => {
  const userid = req.user._id;
  const productid = req.params.productid;

  try {
    const orders = await Order.find({ author: userid });

    const hasPurchased = orders.some((order) =>
      order.items.some((item) => item.itemId === productid)
    );

    if (hasPurchased) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "El usuario no ha comprado este producto." });
    }
  } catch (error) {
    console.error("Error en el middleware de revisión:", error);
    return res.status(500).json({ message: "Error en el servidor." });
  }
};
