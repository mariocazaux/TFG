import { Router } from 'express';
import { getPublicProfile, followUser, unfollowUser } from '../controllers/users.controller';

const router = Router();

router.get('/:id/profile', getPublicProfile);
router.post('/:id/follow', followUser);
router.delete('/:id/follow', unfollowUser);

export default router;