import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ task, closeUpdate }) => {
  const [form, setForm] = useState({ title: "", body: "" });

  useEffect(() => {
    setForm(task);
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleKeyDown = (e, field) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (field === "title") {
      const textarea = document.getElementById("textarea");
      textarea.style.display = "block";
      textarea.focus();
    } else if (field === "body") {
      submit();
      }
    }
  };

  const handleUpdate = async () => {
    const userId = sessionStorage.getItem("id");

    if (!form.title || !form.body) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      await axios.put(`${import.meta.envVITE_REACT_APP_RACKEND_BASEURL}/lists/updateTask/${task.id}`, {
        title: form.title,
        body: form.body,
        id: userId,
      });

      toast.success("Task updated successfully!");
      closeUpdate();
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  return (
    <div className="update-input-panel">
      <h3>Update the Task</h3>
      <input
        type="text"
        className="update-input"
        name="title"
        placeholder="TITLE"
        value={form.title}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, "title")}
      />
      <textarea
        id="textarea"
        placeholder="BODY"
        name="body"
        value={input.body}
        className="todo-input textarea"
        onChange={change}
        onKeyDown={(e) => handleKeyDown(e, "body")}
/>
      <div>
        <button className="todo-btn" onClick={handleUpdate}>Update</button>
        <button className="todo-btn" onClick={closeUpdate}>Cancel</button>
      </div>
    </div>
  );
};

export default Update;
