import express from "express";
import { createUser, deleteUser, getSingleUser, getUser, updateUser } from "../constroller/userController.js";
import { deleteCourse } from "../constroller/coursesController.js";

const userRouter = express.Router();

userRouter.post("/",createUser);
userRouter.get("/",getUser);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteCourse);
userRouter.get("/:id",getSingleUser);

export default userRouter;