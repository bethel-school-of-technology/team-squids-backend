import { Router } from 'express';
import { allUser, createUser, getUser,
 signInUser, signOutUser, modifyUser,deleteUser, verifyCurrentUser } from '../controllers/churchUserController';

const router = Router();

router.get('/', allUser);

router.get('/:id', getUser);

router.get('/search/:query')

router.post('/create-account', createUser);

router.put('/edit-account/:id', modifyUser);

router.post('/signin', signInUser);

router.post('/signout', signOutUser);

router.delete('/delete-account/:id', deleteUser);

router.get("/verify-current-user", verifyCurrentUser);


export default router; 
