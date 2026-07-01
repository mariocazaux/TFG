import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  attendEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  unattendEvent,
  getMyAttendances,
  getMyAttendedEvents,
} from '../controllers/events.controller.ts';

const router = Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/my-attendances', getMyAttendances);
router.get('/my-attended-events', getMyAttendedEvents);
router.post('/:id/attend', attendEvent);
router.delete('/:id/attend', unattendEvent);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
