// import express from 'express';
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '../generated/prisma/index.js';
// import { generateToken } from '../utils/generateToken.js';

// const router = express.Router();
// const prisma = new PrismaClient();

// router.post('/register', async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({
//       data: { name, email, password: hashed, role },
//     });
//     res.json({ token: generateToken(user) ,message:"Successfully registered"});
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // 1. Find user
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   // 2. Check password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//   // 3. Generate JWT
//   const token = generateToken(user); // e.g. jwt.sign({ id: user.id, role: user.role }, ...)
//   // 4. Send JWT in HTTP-only cookie
//   res.cookie('token', token, {
//     httpOnly : true,
//     sameSite : 'strict',
//     secure   : process.env.NODE_ENV === 'production', // HTTPS only in prod
//     maxAge   : 1 * 24 * 60 * 60 * 1000               // 7 days
//   });

//   // 5. Respond (don’t echo the token in JSON)
//   res.json({ message: 'Successfully logged in' });
// });

// export default router;


import express from 'express';
import { login, signup } from '../constroller/authController.js';
const authRouter = express.Router();
authRouter.post("/register",signup);
authRouter.post("/login",login);
export default authRouter;
