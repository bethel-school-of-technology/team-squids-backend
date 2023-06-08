import { Router } from 'express';
import { allUser, createUser, getUser,
 signInUser, modifyUser, deleteUser, vrfyUser } from '../controllers/churchUserController';

const router = Router();

router.get('/', allUser);

router.get('/:id', getUser);

router.get('/search/:query')

router.post('/verify/:id', vrfyUser)

router.post('/create-account', createUser);

router.put('/edit-account/:id', modifyUser);

router.post('/signin', signInUser);

router.delete('/delete-account/:id', deleteUser);


export default router; 
