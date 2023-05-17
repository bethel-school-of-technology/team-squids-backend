import { Router } from 'express';

const router = Router();

router.get('/');

router.post('/');

router.post('/signin');

router.post('/signout');

router.get('/:id');

router.put('/:id');

router.delete('/:id');


export default router;
