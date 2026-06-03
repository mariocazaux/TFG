import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const allowedOrigins = ['http://localhost:4200', 'https://kachaoo.com'];
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (ej. Postman) o si están en la lista permitida
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
  }),
);

// Middleware para entender cuerpos JSON en las peticiones
app.use(express.json());

// Ruta básica de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola! Servidor Express con TypeScript funcionando correctamente.');
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`[Servidor]: Ejecutándose en http://localhost:${port}`);
});
