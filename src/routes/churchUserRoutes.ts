import { Router } from 'express';
import { allUser, createUser, getUser,
 signInUser, signOutUser, modifyUser,deleteUser } from '../controllers/churchUserController';

const router = Router();

router.get('/', allUser);

router.get('/:id', getUser);

router.post('/create-account', createUser);

router.put('/edit-account/:id', modifyUser);

router.post('/signin', signInUser);

router.post('/signout', signOutUser);

router.delete('/delete-account/:id', deleteUser);


export default router; 
