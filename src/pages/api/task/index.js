import { getSession } from "next-auth/react";
import Task from "../../../models/Task";
import dbConnect from "../../../lib/mongoose";

async function handler(req, res) {
  await dbConnect();
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getTasks(req, res);
    }

    case "POST": {
      return addTask(req, res);
    }
  }
}

async function getTasks(req, res) {
  try {
    const session = await getSession({ req });
    const list = await Task.find({ createdBy: session.user.id });

    return res.json({
      message: "get user Tasks successfully",
      success: true,
      tasks: list,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
async function addTask(req, res) {
  try {
    const taskData = JSON.parse(req.body);
    const session = await getSession({ req });
    const newTask = new Task(taskData);

    newTask.createdBy = session.user.id;
    await newTask.save();
    return res.json({
      message: "task added successfully",
      success: true,
      newTask,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default handler;
