var express = require("express");

var app = express();
app.use(express.json());  // Middleware to parse JSON request bodies

// In-memory task storage (You can replace this with a database)
 let tasks = [
   { TaskId: 1, Title: "Task 1", Description: "Description 1", Date: "2024-11-10", status: "To Do" },
   { TaskId: 2, Title: "Task 2", Description: "Description 2", Date: "2024-11-15", status: "In Progress" },
 ];

// Home route
app.get("/", (request, response) => {
  response.send("<h2>Welcome to the API</h2>");
  response.end();
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.send(tasks);
  res.end();
});

// Get task by ID
app.get("/get-task/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find((task) => task.TaskId === taskId);
  if (task) {
    res.send([task]);  // Send task as an array
  } else {
    res.status(404).send("Task not found");
  }
  res.end();
});

// Update task status (new endpoint for task status update)
app.put("/update-task-status/:taskId", (req, res) => {

  const taskId = parseInt(req.params.taskId);
  const newStatus = req.body.status; // Get new status from request body

  // Validate the new status value
  if (!newStatus || !["To Do", "In Progress", "Completed"].includes(newStatus)) {
    return res.status(400).send("Invalid status value. Status must be 'To Do', 'In Progress', or 'Completed'.");
  }

  // Find the task by ID and update the status
  const taskIndex = tasks.findIndex((task) => task.TaskId === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus; // Update the task's status
    res.send({
      message: `Task status updated to ${newStatus}`,
      task: tasks[taskIndex] // Send the updated task
    });
  } else {
    res.status(404).send("Task not found");
  }
  res.end();
});

// Add a new task (Demo)
app.post("/add-product", (req, res) => {
  res.send("POST method: For saving data on server");
  res.end();
});

// Edit product
app.put("/edit-product", (req, res) => {
  res.send("PUT Method: Modifying and updating data on server");
  res.end();
});

// Delete product
app.delete("/delete-product", (req, res) => {
  res.send("Delete Method: Delete product details from server");
  res.end();
});

// Start the server
app.listen(4000, () => {
  console.log(`Server App Started http://127.0.0.1:4000`);
});
