import { Router } from 'express';
import { createOperation, getOperations, getSummary } from '../controllers/OperationController';
import { authMiddleware } from '../middlewares/authMiddleware';


const router = Router();

//só passa se tiver o token
router.post('/', authMiddleware, createOperation);
router.get('/', authMiddleware, getOperations);

router.get('/summary', authMiddleware, getSummary);

export default router;