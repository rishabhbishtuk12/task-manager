import Task from "../models/task.model.js";

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl",
      );
    } else {
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user._id,
      }).populate("assignedTo", "name email profileImageUrl");
    }

    tasks = await Promise.all(
      tasks.map(async task => {
        const completedCount = task.todos.filter(item => item.completed).length;
        return { ...task._doc, completedTodoCount: completedCount };
      }),
    );

    const allTasks = await Task.countDocuments(
      req.user.role === "admin"
        ? {}
        : {
            assignedTo: req.user._id,
          },
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });
    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });
    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        All: allTasks,
        Pending: pendingTasks,
        InProgress: inProgressTasks,
        Completed: completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl",
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      attachments,
      todos,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({ message: "assignedTo must be an array" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      todos,
      attachments,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    task.todos = req.body.todos || task.todos;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res.status(400).json({
          message: "assignedTo must be an array of user IDs",
        });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      userId => userId.toString() === req.user._id.toString(),
    );

    if (!isAssigned && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }

    task.status = req.body.status;

    if (task.status === "completed") {
      task.todos.forEach(item => (item.completed = true));
      task.progress = 100;
    }

    await task.save();
    res.json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTaskChecklist = async (req, res) => {
  try {
    const { todos } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }

    task.todos = todos;

    const completedCount = task.todos.filter(item => item.completed).length;
    const totalItems = task.todos.length;
    task.progress =
      task > 0 ? Math.floor((completedCount / totalItems) * 100) : 0;

    if (task.progress === 100) task.status = "completed";
    else if (task.progress > 0) task.status = "in_progress";
    else task.status = "pending";

    await task.save();

    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl",
    );

    res.status(200).json({
      message: "Task Checklist updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const completedTasks = await Task.countDocuments({ status: "completed" });
    const overdueTasks = await Task.countDocuments({
      status: { $ne: "completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["pending", "in_progress", "completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "_").toLowerCase();
      acc[formattedKey] =
        taskDistributionRaw.find(item => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["all"] = totalTasks;

    const taskPriorities = ["low", "medium", "high"];
    const taskPriorityDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityDistributionRaw.find(item => item._id === priority)
          ?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title, status, priority, dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "pending",
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "completed",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["pending", "in_progress", "completed"];
    const taskDistributionRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "_").toLowerCase();
      acc[formattedKey] =
        taskDistributionRaw.find(item => item._id === status)?.count || 0;
      return acc;
    }, {});

    taskDistribution["all"] = totalTasks;

    const taskPriorities = ["low", "medium", "high"];

    const taskPriorityLevelsRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find(item => item._id === priority)?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
