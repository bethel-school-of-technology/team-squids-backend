import { Router } from 'express';


const router = Router();

router.get('/:id');

router.post('/create-account');

router.put('/edit-account/:id');

router.post('/signin');

router.post('/signout');

router.delete('/delete-account');


export default router; 
