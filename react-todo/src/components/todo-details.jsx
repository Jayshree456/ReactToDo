import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ToDoDetails() {
    const { id } = useParams();  // Get the task ID from the URL params
    const [task, setTask] = useState(null);  // To hold the task data
    const [loading, setLoading] = useState(true);  // To show loading state

    useEffect(() => {
        // Fetch task details using the ID from the URL
        axios.get(`http://127.0.0.1:4040/get-task/${id}`)
            .then(response => {
                setTask(response.data[0]);  // Assuming the data is an array and taking the first item
                setLoading(false);  // Set loading to false once data is loaded
            })
            .catch(error => {
                console.error("Error fetching task details:", error);
                setLoading(false);  // Set loading to false in case of error
            });
    }, [id]);  // The dependency array ensures this runs whenever the ID changes

    // Render loading or task details based on the loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div className="task-details">
            <h3>Task Details</h3>
            <div className="task-info">
                <p><strong>Title:</strong> {task.Title ? task.Title : "No title provided"}</p>
                <p><strong>Description:</strong> {task.Description ? task.Description : "No description available"}</p>
                <p><strong>Date:</strong> {new Date(task.Date).toLocaleString()}</p>
                <p><strong>Status:</strong> {task.status}</p>
            </div>
        </div>
    );
}
