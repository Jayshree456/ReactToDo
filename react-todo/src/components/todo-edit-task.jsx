import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function ToDoEditTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState(null); // Task data
  const [error, setError] = useState(""); // Error handling
  const [loading, setLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const { taskId } = useParams();
  console.log("Editing Task ID:", taskId);

  // Fetch task details
  useEffect(() => {
    console.log("Task ID from URL:", taskId);
    axios
      .get(`http://127.0.0.1:4040/get-task/${taskId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setTask(response.data[0]); // Set the fetched task details
        } else {
          setError("Task not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
        setError("Failed to load task details.");
        setLoading(false);
      });
  }, [taskId]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!task) return;

    // Validate fields
    if (!task.Title || !task.Description || !task.Date) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true); // Set submitting state to true
    axios
      .put(`http://127.0.0.1:4040/edit-task/${taskId}`, task)
      .then(() => {
        alert("Task updated successfully!");
        navigate("/user-dash"); // Redirect to User Dashboard
      })
      .catch((err) => {
        console.error("Error saving task:", err);
        setError("Failed to save task. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submission state
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="p-4">
      <h3>Edit Task</h3>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            value={task?.Title || ""}
            onChange={(e) => setTask({ ...task, Title: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            value={task?.Description || ""}
            onChange={(e) => setTask({ ...task, Description: e.target.value })}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            value={task?.Date ? task.Date.split("T")[0] : ""}
            onChange={(e) => setTask({ ...task, Date: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            value={task?.status || "To Do"}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="form-control"
            required
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/user-dash")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
