import { Router } from 'express';
import { searchDatabase } from '../controllers/searchController';

const router = Router();

router.get('/')
router.get('/googleapi')
router.get('/database/:query', searchDatabase)
// 3 routes 
    // 1 for API search 
    // 1 for db search
    // 1 combine search
// Do we need 3? Why not


export default router;