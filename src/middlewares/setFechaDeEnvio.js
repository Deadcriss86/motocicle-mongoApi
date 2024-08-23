export const setFechaDeEnvio = function (next) {
  if (this.fecha_de_envio) {
    this.fecha_de_envio.setHours(0, 0, 0, 0);
  }
  next();
};
