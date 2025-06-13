import express from "express";
import brcypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/index.js";
import { generateToken } from "../utils/generateToken.js";
const prisma = new PrismaClient();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = await  brcypt.hash(password, 10);
    const userData = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
      },
    });
    res
      .status(200)
      .json({ message: "Successfully registered", user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await prisma.user.findUnique({
      where: {
        email
      },
    });
    const hashPassword = await brcypt.compare(password, userData?.password);
    if (!userData || !hashPassword) {
      return res
        ?.status(404)
        .json({ message: "User not found or password is incorrect" });
    }
const token = await generateToken({id:userData.id,email:userData.email, role:userData.role});
res.cookie("token",token,{
    sameSite:"strict",
    httpOnly:true,
    maxAge: 1*24*60*60*1000
});
    res.status(200).json({ message: "Successfully Login", user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
