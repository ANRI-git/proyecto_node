import { Router } from 'express';
import { routineController } from '../controllers/routines.js';
import { token } from '../services/jwt.js';

const router = Router();

router.get('/', routineController.getAllRoutines);
router.get('/s', routineController.getByName);
router.get('/t', routineController.getByType);
router.get('/:id', routineController.getById);
router.post('/', token.validate, routineController.createRoutine);
router.patch('/:id', token.validate, routineController.updateRoutine);
router.delete('/:id', token.validate, routineController.deleteRoutine);

export default router;
