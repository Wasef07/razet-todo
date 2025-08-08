import express from "express";
import { createTask, getTasksByUserId} from "../models/listModels.js";
import { getUserByEmail } from "../models/userModel.js";
import { getUserById } from "../models/userModel.js";
import { updateTask } from "../models/listModels.js";
import { deleteTaskById } from "../models/listModels.js";

const router = express.Router();

router.post("/addTask", async (req, res) => {
  const { title, body, id } = req.body;

  try {
    const user = await getUserById(id);
if (!user) {
  return res.status(404).json({ message: "User not found" });
}

    const task = await createTask(title, body, user.id);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
});

router.put("/updateTask/:id", async (req, res) => {
  const { title, body, id } = req.body;
  const taskId = req.params.id;
  try {
    const updated = await updateTask(taskId, title, body, id); 
    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});


router.delete("/deleteTask/:id", async (req, res) => {
  const { id } = req.body; 
  const taskId = req.params.id;    

  try {
    const user = await getUserById(id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deleted = await deleteTaskById(taskId, user.id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});


router.get("/getTasks/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const tasks = await getTasksByUserId(userId);
    if (tasks.length !== 0) {
      res.status(200).json({ list: tasks });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

export default router;