export const isAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin === "true";

  if (req.user && isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado: no eres administrador" });
  }
};
