/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoUserDashBoard() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userid"]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSignout = () => {
    removeCookie("userid");
    navigate("/user-login");
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    let newStatus;
    // Toggle status based on current value
    if (currentStatus === "To Do") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed";
    } else {
      newStatus = "To Do";
    }

    try {
      // Update the status in the backend
      await axios.put(`http://127.0.0.1:4040/update-task-status/${taskId}`, {
        status: newStatus,
      });
      // Update status in the local state to reflect the change in UI
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.TaskId === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      setError("Failed to update task status. Please try again.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:4040/delete-task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.TaskId !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  useEffect(() => {
    if (!cookies["userid"]) {
      navigate("/user-login");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(
        `http://127.0.0.1:4040/get-tasks/${cookies["userid"]}?status=${statusFilter}&sortOrder=${sortOrder}`
      )
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks. Please try again later.");
        setLoading(false);
      });
  }, [cookies["userid"], statusFilter, sortOrder, navigate]);

  return (
    <div className="p-4 bg-light m-4">
      <h3 className="d-flex justify-content-between">
        <span>User Dashboard</span>
        <span>{cookies["userid"]}</span>
        <button className="btn btn-link" onClick={handleSignout}>
          Signout
        </button>
      </h3>
      <div className="my-2">
        <Link to="/add-task" className="btn btn-primary bi bi-calendar-check">
          Add Task
        </Link>
      </div>

      {loading && <div className="alert alert-info">Loading tasks...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex flex-wrap">
        {tasks.length === 0 ? (
          <div className="alert alert-warning w-100">
            You have no tasks yet!
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.TaskId} className="alert alert-success m-4 w-25">
              <div className="fs-4">{task.Title}</div>
              <div className="my-2">{task.Description}</div>
              <div className="my-2">
                Due: {new Date(task.Date).toLocaleDateString()}
              </div>
              <div className="my-2">
                Status: {task.status}
                {/* <button
                  onClick={() => toggleTaskStatus(task.TaskId, task.status)}
                  className="btn btn-warning mx-2"
                >
                  {task.status === "Completed"
                    ? "Mark as To Do"
                    : task.status === "To Do"
                    ? "Mark as In Progress"
                    : "Mark as Completed"}
                </button> */}
              </div>
              <div className="my-2">
                <Link to={`/todo-details/${task.TaskId}`} className="btn btn-success me-2">View</Link>
                <Link to={`/todo-edit-task/${task.TaskId}`} className="btn btn-info me-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => deleteTask(task.TaskId)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
