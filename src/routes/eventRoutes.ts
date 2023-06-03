import { Router } from 'express';
import { createEvent, deleteEvent, getAllEvents, getEvent, getTenEvents, getUserEvents, updateEvent } from '../controllers/eventController';
import { searchEvent } from '../controllers/searchController';

const router = Router();

router.get("/", getAllEvents)
router.get("/:eventId", getEvent)
router.get("/userevent/:userId", getUserEvents)
router.get('/searchEvents', getTenEvents)
router.get('/search/:query', searchEvent)
router.post("/", createEvent)
router.put('/editevent/:eventId', updateEvent)
router.delete("/:eventId", deleteEvent)

export default router;