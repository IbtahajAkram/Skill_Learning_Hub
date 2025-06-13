// import { PrismaClient } from "../generated/prisma/index.js";
// import cloudinary from "../utils/cloudinary.js";
// import streamifier from "streamifier";

// const prisma = new PrismaClient();
// // export const getAllCourses = async (req, res) => {
// //   try {
// //     const userData = await req.user;
// //     const courses = await prisma.course.findMany();
// //     res
// //       .status(200)
// //       .json({ message: "Courses fetched successfully", courses, userData });
// //   } catch (error) {
// //     res.status(400).json({ message: "error occur while get all course" });
// //   }
// // };

// // export const getOwnCourses = async (req, res) => {
// //   try {
// //     const courses = await prisma.course.findMany({
// //       where: {
// //         instructorId: req.user.id,
// //       },
// //       include: {
// //         instructor: true,
// //       },
// //     });
// //     if (!courses) {
// //       return res.status(404).json({ message: "No courses found" });
// //     }
// //     res.status(200).json({ message: "Courses fetched successfully", courses });
// //   } catch (error) {
// //     res.status(400).json({ message: "error occur while get own course" });
// //   }
// // };

// // const uploadToCloudinary = (buffer) =>
// //   new Promise((resolve, reject) => {
// //     const steam = cloudinary.uploader.upload_stream(
// //       { folder: "courses" },
// //       (err, res) => {
// //         if (err) {
// //           return reject(err);
// //         }
// //         resolve(res.secure_url);
// //       }
// //     );
// //     streamifier.createReadStream(buffer).pipe(steam);
// // });

// // const uploadToCloudinary = (buffer) => new Promise((resolve, reject) => {
// //     const stream = cloudinary.uploader.upload_stream({ folder: "courses" }, (error, result) => {
// //         if (error) return reject(error);
// //         resolve(result.secure_url);
// //       }
// //     );
// //     streamifier.createReadStream(buffer).pipe(stream);
// //   });

// // export const createCourse = async (req,res)=>{
// //     try {
// //        const {title,description} = req.body;
// //        let imageUrl;
// //        const instructorId =  req.user.id;
// //        console.log(instructorId)
// //        if(req.file){
// //         imageUrl = await uploadToCloudinary(req.file.buffer)
// //        }
// //        const course = await prisma.course.create({
// //         data:{
// //             title,description,image:imageUrl,instructorId:instructorId
// //         }
// //        })
// //        res.status(201).json({message:"Course created successfully",course})
// //     } catch (error) {
// //             res.status(400).json({ message:  error.message});

// //     }
// // }

// // export const uploadToCloudinary = (buffer) =>
// //   new Promise((resolve, rejcet) => {
// //     const strem = cloudinary.uploader.upload_stream(
// //       { folder: "courses" },
// //       (error, result) => {
// //         if (error) {
// //           rejcet(error);
// //         }
// //         resolve(result.secure_url);
// //       }
// //     );
// //     streamifier.createReadStream(strem).pipe(buffer);
// //   });

// // router.post(
// //   "/",
// //   protect,
// //   authorize("INSTRUCTOR", "ADMIN"),
// //   upload.single("image"),
// //   async (req, res) => {
// //     console.log("🧾 FILE:", req.file);
// //     console.log("🧾 BODY:", req.body);
// //     try {
// //       const { title, description } = req.body;
// //       const instructorId = req.user.id;
// //       let imageUrl = null;

// //       if (req.file) {
// //         imageUrl = await uploadToCloudinary(req.file.buffer);
// //       }

// //       const course = await prisma.course.create({
// //         data: {
// //           title,
// //           description,
// //           image: imageUrl,
// //           instructorId,
// //         },
// //       });

// //       res.json(course);
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ error: "Something went wrong" });
// //     }
// //   }
// // );

// // export const uploadToCloudinary = (buffer) =>
// //   new Promise((resolve, rejcet) => {
// //     const strem = cloudinary.uploader.upload_stream(
// //       { folder: "courses" },
// //       (error, result) => {
// //         if (error) {
// //           rejcet(error);
// //         }
// //         resolve(result.secure_url);
// //       }
// //     );
// //     streamifier.createReadStream(strem).pipe(buffer);
// // });

// export const getOwnCourses = async (req, res) => {
//   try {
//     const role = req.user.role;
//     // const intructorId = req.user.id;
//     const courses = await prisma.course.findMany({
//       where: {
//         instructorId: req.user.id,
//       },
//       include:{
//         instructor:true
//       }
//     });
//     res
//       .status(200)
//       .json({ message: "succesfully your course data fetched!", courses,role });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const getAllCourses = async (req, res) => {
//   try {
//         const role = req.user.role;

//     const courses = await prisma.course.findMany();
//     res
//       .status(200)
//       .json({ message: "successfully all courses fetched!", courses,role });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const getCourseById = async (req,res)=>{
//   try {
//     const courseId = req.params.id;
//     const course =  await prisma.course.findUnique({
//       where:{
//         id: courseId,
//       }
//     });;
//     if(!course){
//       return res.status(404).json({ message: "Course not found" });
//     }
//     res.status(200).json({ message: "successfully course fetched", course });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
    
//   }
// }
// export const createCourse = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     let imageUrl;
//     if (req.file) {
//       imageUrl = await uploadToCloudinary(req.file.buffer);
//     }
//     const intructorIds = req.user.id;
//     const course = await prisma.course.create({
//       data: {
//         title,
//         description,
//         image: imageUrl,
//         instructorId: intructorIds,
//       },
//     });

//     res.status(201).json({ message: "succesfully course created", course });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const uploadToCloudinary = (buffer) =>
//   new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "courses" },
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }
//         resolve(result.secure_url);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
// });

// export const updateCourse = async (req, res) => {
//   try {
 
//     res.status(200).json({
//       message: "Successfully updated course",
//       course: updatedCourse,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteCourse = async (req, res) => {
//   try {
//     const course = await prisma.course.findUnique({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (req.user.id !== course.instructorId) {
//       return res
//         .status(403)
//         .json({ message: "You can delete only your course!" });
//     }
//     await prisma.course.delete({
//       where: {
//         id: req.params.id,
//         },
//     })

//     res.status(200).json({ message: "successfully course deleted!", course });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//     console.log(error.message);
//   }
// };


import { PrismaClient } from "../generated/prisma/index.js";
import cloudinary from "../utils/cloudinary.js";
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
    );
    streamifier.createReadStream(buffer).pipe(stream)
  });
export const createCourse = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const userId = req.user.id;
  

    let imageUrl;
     if(req.file){
        imageUrl = await uploadToCloudinary(req.file.buffer)
     }
    const course = await Prisma.course.create({
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
    const userData = await req.user;
    const courses = await Prisma.course.findMany();
    res
      .status(200)
      .json({ message: "All courses fetched successfully", courses,userData });
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
    const { title, description, image } = req.body;

    const course = await Prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        title: title,
        description: description,
        image: image,
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
