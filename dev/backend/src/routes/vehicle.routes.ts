import { Router } from 'express';
import { createVehicle, getVehicles } from '../controllers/vehicle.controller.ts';

const router = Router();

router.get('/', getVehicles);
router.post('/', createVehicle);

export default router;
