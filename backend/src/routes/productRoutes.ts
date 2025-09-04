import express from 'express';
import { getAllProducts, getProductsByCategory } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category/:categoryId', getProductsByCategory);

export default router;