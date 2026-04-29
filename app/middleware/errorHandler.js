export const errorHandler = (err, req, res, next) => {
  // Imprimir el error en consola para debugging
  console.error("Error capturado por Middleware Global:", err);

  // Si el error ya tiene un status HTTP asignado, se usa; si no, 500 por defecto.
  const statusCode = err.statusCode || err.status || 500;
  
  // Mensaje del error
  const message = err.message || "Ha ocurrido un error interno en el servidor";

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    // Solo mostrar detalles técnicos en desarrollo
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
