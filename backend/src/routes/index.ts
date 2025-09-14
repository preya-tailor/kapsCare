import express from 'express';
import categoryRoutes from '../routes/categoryRoutes';
import productRoutes from '../routes/productRoutes';
import reviewRoutes from '../routes/reviewRoutes';
import contactRoutes from '../routes/contactRoutes';

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/contact", contactRoutes)

export default router;