import {nanoid} from 'nanoid';
import { PrismaClient } from './generated/prisma/index.js';
const prisma = new PrismaClient();
export const createUser =  async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const student = await prisma.student.create({
        data: { id:nanoid(12), name, email, age },
      });
      res.status(201).json({message:"Student Successfully Created!" ,student:student});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await prisma.student.findMany()
      res.status(200).json(student);
    } catch (err) {
      res.status(404).json({ error: 'Student not found' });
    }
  };

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
      const updated = await prisma.student.update({
        where: { id: parseInt(id) },
        data: { name, email, age },
      });
      res.status(200).json({message:"Student Successfully Updated!" ,UpdatedStudent:updated});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.student.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: 'Student Successfully deleted!' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await prisma.student.findUnique({
        where: { id: id },
      });
      res.status(200).json({student:student});
    } catch (err) {
      res.status(404).json({ error: 'Student not found' });
    }
  };