import { Router } from 'express';
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from '../controllers/routes.controller.ts';

const router = Router();

router.post('/', createRoute);
router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

export default router;
