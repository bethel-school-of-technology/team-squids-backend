import { Router } from 'express';
import { createChurch, deleteChurch, editChurch, getChurch, getOneChurch } from '../controllers/churchController';
import { searchChurch } from '../controllers/searchController';

const router = Router();

router.get('/', getChurch);

router.post('/', createChurch);

router.get('/:id', getOneChurch);

router.get('/search/:query', searchChurch)

router.put('/:id', editChurch);

router.delete('/:id', deleteChurch);


export default router;
