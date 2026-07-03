import { Router } from 'express';
import {
  followUser,
  unfollowUser,
  searchUsers,
  getPublicProfile,
} from '../controllers/users.controller.ts';

const router = Router();

router.get('/search', searchUsers);
router.get('/:id/profile', getPublicProfile);
router.post('/:id/follow', followUser);
router.delete('/:id/follow', unfollowUser);

export default router;
