import express from 'express';
import categoryRoutes from '../routes/categoryRoutes';
import productRoutes from '../routes/productRoutes';
import reviewRoutes from '../routes/reviewRoutes';
import contactRoutes from '../routes/contactRoutes';
import checkoutRoutes from '../routes/checkoutRoutes';

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/contact", contactRoutes);
router.use("/checkout", checkoutRoutes);

export default router;