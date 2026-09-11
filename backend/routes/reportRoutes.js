import express from 'express';
import { createReport, getMyReports, getReportById } from '../controllers/reportController.js';
import { protectCitizen } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/', protectCitizen, upload.single('image'), createReport);
router.get('/my', protectCitizen, getMyReports);
router.get('/:id', protectCitizen, getReportById);

export default router;
