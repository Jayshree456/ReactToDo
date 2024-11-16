import { useState, useEffect } from "react";
import axios from "axios";

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get("http://127.0.0.1:4040/get-tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const filteredTasks = filter === "All" 
    ? tasks 
    : tasks.filter(task => task.Status === filter);

  return (
    <div className="m-2 p-2 bg-light">
      <h2>Task List</h2>

      {/* Filter Dropdown */}
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">Filter by Status</label>
        <select
          id="filter"
          className="form-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.TaskId}>
              <td>{task.TaskId}</td>
              <td>{task.Title}</td>
              <td>{task.Description}</td>
              <td>{new Date(task.Date).toLocaleDateString()}</td>
              <td>{task.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
