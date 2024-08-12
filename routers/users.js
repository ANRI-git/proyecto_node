import { Router } from 'express';
import { userController } from '../controllers/users.js';

export const router = Router();

router.get('/');
router.get('/:id');
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
