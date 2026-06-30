import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  attendEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/events.controller.ts';

const router = Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.post('/:id/attend', attendEvent);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
