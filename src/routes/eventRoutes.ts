import { Router } from 'express';
import { createEvent, deleteEvent, getAllEvents, getEvent, getTenEvents, updateEvent } from '../controllers/eventController';

const router = Router();

router.get("/", getAllEvents)
router.get("/:eventId", getEvent)
router.get('/searchEvents', getTenEvents)
router.post("/", createEvent)
router.put('/editevent/:eventId', updateEvent)
router.delete("/:eventId", deleteEvent)

export default router;