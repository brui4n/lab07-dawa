import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import db from "./models/index.js";


dotenv.config();


const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());



// Detectar entorno
const isDev = process.env.NODE_ENV === "development";


// Sincronización inteligente
if (isDev) {
  await db.sequelize.sync({ force: true }); // borra y recrea en desarrollo
} else {
  await db.sequelize.sync({ alter: true }); // crea/ajusta tablas sin borrar datos en producción
}


// Inicializar roles (solo si no existen)
const count = await db.role.count();


if (count === 0) {
  await db.role.bulkCreate([
    { id: 1, name: "user" },
    { id: 2, name: "moderator" },
    { id: 3, name: "admin" }
  ]);
  console.log("Roles creados");
}


// rutas
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";


authRoutes(app);
userRoutes(app);

app.use(errorHandler);



// Puerto desde .env
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV}`);
});
