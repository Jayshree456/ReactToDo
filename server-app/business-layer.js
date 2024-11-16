
var express = require("express");
var mongoClient = require("mongodb").MongoClient;

var cors = require("cors");

var conString = "mongodb://localhost:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register-user", (req, res) => {
    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("todo");
        database.collection("users").insertOne(user).then(() => {
            console.log("User Registered");
            res.end();
        });
    });
});

app.get("/users", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    });
});

app.post("/add-task", (req, res) => {


    var task = {
        TaskId: parseInt(req.body.TaskId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId,
        status: "To Do"  // Default status when a task is created
    };

    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo");
        database.collection("tasks").insertOne(task).then(() => {
            console.log("Task Added..");
            res.end();
        })
    });
});

app.get("/get-tasks/:userid", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo");
        database.collection("tasks").find({ UserId: req.params.userid }).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    });
});
app.get("/get-task/:taskId", (req, res) => {
    const taskId = parseInt(req.params.id); // Ensure TaskId is converted to a number
  
    console.log("Received TaskId:", taskId);
  
    mongoClient.connect(conString).then((clientObj) => {
      const database = clientObj.db("todo");
      database
        .collection("tasks")
        .findOne({ TaskId: taskId })
        .then((document) => {
          if (document) {
            console.log("Task Found:", document);
            res.send([document]); // Respond with an array as expected by the frontend
          } else {
            console.log("Task not found for TaskId:", taskId);
            res.status(404).send({ message: "Task not found" });
          }
        })
        .catch((err) => {
          console.error("Error retrieving task:", err);
          res.status(500).send({ message: "Error retrieving task", error: err });
        });
    });
  });
  

app.put("/edit-task/:id", (req, res) => {
    var id = parseInt(req.params.id);

    var task = {
        TaskId: parseInt(req.body.TaskId),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId,
        status: req.body.status
    };

    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo");
        database.collection("tasks").updateOne({ TaskId: id }, { $set: task }).then(() => {
            console.log("Task Updated..");
            res.end();
        });
    });
});

app.put("/update-task-status/:id", (req, res) => {
    // Get taskId and the new status from the request
    //var id = parseInt(req.params.id);
    var { status } = req.body;
    const validStatuses = ['To Do', 'In Progress', 'Completed'];

    if (!validStatuses.includes(status)) {
        return res.status(400).send({
            message: 'Invalid status value. Allowed values are: To Do, In Progress, Completed.'
        });
    }
    // Set the next status based on the current status
    let newStatus;
    if (status === 'To Do') {
        newStatus = 'In Progress';
    } else if (status === 'In Progress') {
        newStatus = 'Completed';
    } else {
        newStatus = 'To Do';
    }

    // Update the task status
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo");
        database.collection("tasks").updateOne( { $set: { newStatus } }).then(() => {
            console.log(`Task status updated to ${newStatus}`);
            res.send({ message: `Task status updated to ${newStatus}` });
            res.end();
        }).catch(error => {
            console.error("Error updating task status:", error);
            res.status(500).send({
                message: "Failed to update task status"
            });
        });
    });
});
app.put("/edit-task/:taskId", (req, res) => {
    const { taskId } = req.params;
    const { Title, Description, Date, status } = req.body;
  
    mongoClient.connect(conString).then((clientObj) => {
      const database = clientObj.db("todo");
  
      // Ensure that the required fields are provided
      if (!Title || !Description || !Date || !status) {
        return res.status(400).send("All fields are required.");
      }
  
      const updateFields = {
        Title,
        Description,
        Date,
        status,
      };
  
      // Update the task in the database
      database
        .collection("tasks")
        .updateOne({ TaskId: parseInt(taskId) }, { $set: updateFields })
        .then((result) => {
          if (result.modifiedCount > 0) {
            res.send("Task updated successfully");
          } else {
            res.status(404).send("Task not found");
          }
        })
        .catch((err) => {
          console.error("Error updating task:", err);
          res.status(500).send("Error updating task");
        });
    });
  });
  


app.delete("/delete-task/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("todo");
        database.collection("tasks").deleteOne({ TaskId: id }).then(() => {
            console.log("Task Deleted");
            res.end();
        });
    });
});

app.listen(4040);
console.log(`Server started http://127.0.0.1:4040`);
