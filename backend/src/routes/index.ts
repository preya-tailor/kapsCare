import express from 'express';
import categoryRoutes from '../routes/categoryRoutes';
import productRoutes from '../routes/productRoutes';

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;