import { Router } from 'express';
import { createEvent, getAllEvents, attendEvent } from '../controllers/events.controller.ts';

const router = Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.post('/:id/attend', attendEvent);

export default router;
