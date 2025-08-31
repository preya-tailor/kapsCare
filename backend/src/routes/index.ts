import express from 'express';
import categoryRoutes from '../routes/categoryRoutes';

const router = express.Router();

router.use("/categories", categoryRoutes);

export default router;