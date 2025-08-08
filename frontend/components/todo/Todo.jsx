import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

const Todo = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [id, setId] = useState(null);
  const [input, setInput] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState({ title: "", body: "" });

  useEffect(() => {
    const storedId = sessionStorage.getItem("id");
    setId(storedId);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && id) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_RACKEND_BASEURL}/lists/getTasks/${id}`)
        .then((response) => {
          if (response.data.list) {
            setArray(response.data.list);
          }
        })
        .catch(() => {});
    } else {
      setArray([]);
    }
  }, [isLoggedIn, id]);

  const show = () => {
    const textarea = document.getElementById("textarea");
    if (textarea) textarea.style.display = "block";
  };

  const change = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async () => {
    if (input.title.trim() === "" || input.body.trim() === "") {
      toast.error("Title and Body cannot be empty.");
      return;
    }

    if (isLoggedIn && id) {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_RACKEND_BASEURL}/lists/addTask`, {
          title: input.title,
          body: input.body,
          id: id,
        });

        setInput({ title: "", body: "" });
        toast.success("Task added successfully!");

        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_RACKEND_BASEURL}/lists/getTasks/${id}`);
        setArray(response.data.list || []);
      } catch {
        toast.error("Failed to save task. Please try again.");
      }
    } else {
      setInput({ title: "", body: "" });
      toast.error("Please sign up to save your tasks permanently.");
    }
  };

  const del = async (taskId) => {
    const userId = sessionStorage.getItem("id");
    if (userId) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_RACKEND_BASEURL}/lists/deleteTask/${taskId}`, {
          data: { id: userId },
        });

        toast.success("Task deleted successfully!");
        setArray((prev) => prev.filter((task) => task.id !== taskId));
      } catch {
        toast.error("Failed to delete task.");
      }
    } else {
      toast.error("You must be logged in to delete a task.");
    }
  };

  const dis = (task) => {
    setSelectedTask(task);
    setIsUpdateVisible(true);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      if (field === "body" && e.shiftKey) return; 

      e.preventDefault();

      if (field === "title") {
        show();
        const textarea = document.getElementById("textarea");
        if (textarea) textarea.focus();
      } else if (field === "body") {
        submit();
      }
    }
  };

  return (
    <>
      <div className="todo">
        <div className="todo-main container">
          <div className="todo-input-panel">
            <div className="todo-card">
              <input
                type="text"
                placeholder="TITLE"
                className="todo-input"
                name="title"
                value={input.title}
                onClick={show}
                onChange={change}
                onKeyDown={(e) => handleKeyDown(e, "title")}
              />
              <textarea
                id="textarea"
                type="text"
                placeholder="BODY"
                name="body"
                value={input.body}
                className="todo-input textarea"
                onChange={change}
                onKeyDown={(e) => handleKeyDown(e, "body")}
              />
              <button className="todo-btn" onClick={submit}>
                Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="todo-body">
          <div className="todo-cards-container">
            {isLoggedIn &&
              array.length > 0 &&
              array.map((item, index) => (
                <TodoCards
                  key={index}
                  id={item.id}
                  title={item.title}
                  body={item.body}
                  delid={del}
                  display={dis}
                />
              ))}
          </div>
        </div>

        <ToastContainer autoClose={1500} />
      </div>

      {isUpdateVisible && (
        <div className="todo-update">
          <Update task={selectedTask} closeUpdate={() => setIsUpdateVisible(false)} />
        </div>
      )}
    </>
  );
};

export default Todo;
