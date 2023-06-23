import { Router } from 'express';
import { getAPIKey } from '../controllers/churchUserController';

const router = Router();

router.get("/", getAPIKey);

export default router; 
