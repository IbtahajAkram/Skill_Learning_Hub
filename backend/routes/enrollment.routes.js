import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', protect, authorize("STUDENT"), async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user.id;

  const enrollment = await prisma.enrollment.create({
    data: { courseId, studentId },
  });

  res.json(enrollment);
});

router.get('/', protect, authorize("STUDENT"), async (req, res) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: req.user.id },
    include: { course: true },
  });
  res.json(enrollments);
});

export default router;
