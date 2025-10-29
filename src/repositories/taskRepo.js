import prisma from '../config/db.js';

// Get all tasks
export async function findAll() {
  return prisma.task.findMany();
}

// Create a new task
export async function create(data) {
  return prisma.task.create({
    data,
  });
}

// Get a single task by ID
export async function getTaskById(id) {
  return prisma.task.findUnique({
    where: { id: Number(id) },
  });
}