import { getSession } from "next-auth/react";
import Task from "../../../models/Task";
import dbConnect from "../../../lib/mongoose";

async function handler(req, res) {
  await dbConnect();
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getTask(req, res);
    }

    case "PUT": {
      return updateTask(req, res);
    }

    case "DELETE": {
      return deleteTask(req, res);
    }
  }
}

async function getTask(req, res) {
  try {
    const { id } = req.query;
    const doc = await Task.findOne({ _id: id });
    if (!doc)
      return res.json({
        message: "Doc not exist",
        success: false,
      });
    return res.json({
      message: "Get one task successfully",
      success: true,
      task: doc,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.query;
    const dataUpdate = JSON.parse(req.body);
    const update = await Task.findOneAndUpdate({ _id: id }, dataUpdate, {
      new: true,
    });

    if (!update)
      return res.json({
        message: "Doc not exist",
        success: false,
      });

    return res.json({
      message: "Task updated successfully",
      success: true,
      task: update,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
async function deleteTask(req, res) {
  try {
    const { id } = req.query;
    const deleteDoc = await Task.findOneAndDelete({ _id: id });
    if (!deleteDoc)
      return res.json({
        message: "Doc not exist",
        success: false,
      });
    return res.json({
      message: "Tasks deleted successfully",
      success: true,
      task: deleteDoc,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default handler;
