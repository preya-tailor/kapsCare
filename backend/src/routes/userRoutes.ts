import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

// User routes
router.post('/save', userController.saveUser);
router.get('/:id', userController.getUserById);
router.get('/phone/:phone', userController.getUserByPhone);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

export default router;