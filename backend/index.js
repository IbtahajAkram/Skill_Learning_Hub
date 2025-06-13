import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

dotenv.config();
const app = express();
app.use(cookieParser());
const prisma = new PrismaClient();

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Course Management API');
}
);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



