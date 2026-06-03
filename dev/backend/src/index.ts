import express, { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

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
