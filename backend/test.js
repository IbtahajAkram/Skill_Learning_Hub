import { PrismaClient } from "./generated/prisma/index.js";
import cloudinary from "./utils/cloudinary.js";
import streamifier from "streamifier";
const Prisma = new PrismaClient();

export const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "courses" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      },
      streamifier.createReadStream(buffer).pipe(stream)
    );
  });
export const createCourse = async (req, res) => {
  try {
    const { title, description, catagroy, price, thumbnail } = req.body;
    const userId = req.user.id;
    if (!title || !description || !catagroy || !price || !thumbnail) {
      return res.json({ message: "All fields are required" });
    }

    let imageUrl;
     if(req.file){
        imageUrl = await uploadToCloudinary(req.file.buffer)
     }
    const course = await Prisma.course.creatre({
      data: {
        instructorId: userId,
        title: title,
        description: description,
        image: imageUrl, // Use the uploaded image URL
      },
    });
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Prisma.course.findMany();
    res
      .status(200)
      .json({ message: "All courses fetched successfully", courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        //include use karta ha jaab hum to iska matlab ha ka // hum course ke sath instructor ki details bhi chahte hain
        instructor: true, // Include instructor details if needed
      },
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, catagroy, price, thumbnail } = req.body;

    const course = await Prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        title: title,
        description: description,
        catagroy: catagroy,
        price: price,
        thumbnail: thumbnail,
      },
    });

    //    if(!courseFind){
    //     return res.status(404).json({ message: "Course not found" });
    //    }
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    res.status(200).json({ message: "Course deleted successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOwnCourses = async (req,res)=>{
    try {
     const courseId = req.params.id;
     const InstructorId = req.user.id;
     const courses = await Prisma.course.findMany({
      where:{
        instructorId:InstructorId
      },
      include: {
        instructor: true, // Include instructor details if needed
      },
     })
res.status(200).json({ message: "Own courses fetched successfully", courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}
