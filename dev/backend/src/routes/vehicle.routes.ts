import { Router } from 'express';
import {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicle.controller.ts';

const router = Router();

router.get('/', getVehicles);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;
