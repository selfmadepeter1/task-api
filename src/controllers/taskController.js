import * as taskService from '../services/taskService.js';

export async function getTasks(req, res) {
  const tasks = await taskService.getAllTasks();
  res.status(200).json(tasks);
}

export async function createTask(req, res) {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Validation failed",
      details: ["title is required"]
    });
  }

  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Validation failed",
      details: ["ID must be a number"]
    });
  }

  const task = await taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
}