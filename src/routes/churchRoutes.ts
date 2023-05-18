import { Router } from 'express';
import { createChurch, deleteChurch, editChurch, getChurch, getOneChurch } from '../controllers/churchController';

const router = Router();

router.get('/',getChurch);

router.post('/',createChurch);

// router.post('/signin');

// router.post('/signout');

router.get('/:id', getOneChurch);

router.put('/:id',editChurch);

router.delete('/:id',deleteChurch);


export default router;
