import { Router } from 'express';
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  bookmarkRoute,
  unbookmarkRoute,
  getMyBookmarks,
  getMyBookmarkedRoutes,
  getMyRoutes,
  getMyAvailableRoutes,
} from '../controllers/routes.controller.ts';

const router = Router();

router.post('/', createRoute);
router.get('/', getAllRoutes);
router.get('/my-available-routes', getMyAvailableRoutes);
router.get('/my-routes', getMyRoutes);
router.get('/my-bookmarks', getMyBookmarks);
router.get('/my-bookmarked-routes', getMyBookmarkedRoutes);
router.get('/:id', getRouteById);
router.post('/:id/bookmark', bookmarkRoute);
router.delete('/:id/bookmark', unbookmarkRoute);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

export default router;
