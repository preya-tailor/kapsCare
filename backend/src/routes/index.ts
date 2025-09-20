import express from 'express';
import categoryRoutes from '../routes/categoryRoutes';
import productRoutes from '../routes/productRoutes';
import reviewRoutes from '../routes/reviewRoutes';
import contactRoutes from '../routes/contactRoutes';
import checkoutRoutes from '../routes/checkoutRoutes';
import userRoutes from '../routes/userRoutes';

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/contact", contactRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/users", userRoutes);

export default router;