import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { protect, authorize } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import { createCourse, deleteCourse, getAllCourses, getCourseById, getOwnCourses, updateCourse } from "../constroller/coursesController.js";
const router = express.Router();
const prisma = new PrismaClient();


// // Update a course
// router.put(
//   "/:id",
//   protect,
//   authorize("INSTRUCTOR", "ADMIN"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const course = await prisma.course.findUnique({
//         where: { id: req.params.id },
//       });

//       if (!course) return res.status(404).json({ error: "Course not found" });

//       if (req.user.role !== "ADMIN" && req.user.id !== course.instructorId) {
//         return res.status(403).json({ error: "Forbidden" });
//       }

//       let updatedData = {
//         title: req.body.title,
//         description: req.body.description,
//       };

//       if (req.file) {
//         // Use uploadToCloudinary for buffer upload
//         const imageUrl = await uploadToCloudinary(req.file.buffer);
//         updatedData.image = imageUrl;
//       }

//       const updated = await prisma.course.update({
//         where: { id: req.params.id },
//         data: updatedData,
//       });

//       res.json({ message: "Course Successfully Updated!", updated });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   }
// );

// // Delete a course
// router.delete(
//   "/:id",
//   protect,
//   authorize("INSTRUCTOR", "ADMIN"),
//   async (req, res) => {
//     const course = await prisma.course.findUnique({
//       where: { id: req.params.id },
//     });

//     if (!course) return res.status(404).json({ error: "Course not found" });

//     if (req.user.role !== "ADMIN" && req.user.id !== course.instructorId) {
//       return res
//         .status(403)
//         .json({ message: "You Can Only Delete Your Course Not Others" });
//     }

//     await prisma.course.delete({ where: { id: req.params.id } });

//     res.json({ message: "All clean! The course has been erased." });
//   }
// );

// // Get Single a course
// router.get("/:id", async (req, res) => {
//   try {
//     const courseId = req.params.id;

//     const course = await prisma.course.findUnique({
//       where: { id: courseId },
//     });

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json(course);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .json({ message: "Error occurred while fetching course details" });
//   }
// });

router.get("/",protect,getAllCourses);
router.post("/",protect,authorize("ADMIN", "INSTRUCTOR"), upload.single("image"),createCourse);
router.get("/own",protect,authorize("ADMIN", "INSTRUCTOR"),getOwnCourses);
router.delete("/:id",protect,authorize("ADMIN", "INSTRUCTOR"),deleteCourse);
router.put("/:id",protect,authorize("ADMIN", "INSTRUCTOR"), upload.single("image"),updateCourse);
router.get("/:id",getCourseById);
export default router;
