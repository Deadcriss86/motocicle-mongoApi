export const NewProduct = async (req, res) => {
  const productData = req.body;
  res.send({
    message: "Si se pudo",
    data: productData,
  });
};

export const GetProducts = async (req, res) => {};
