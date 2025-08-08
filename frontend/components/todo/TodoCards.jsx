import React from "react";

const TodoCards = ({ id, title, body, delid, display }) => {
  return (
    <div className="todo-cards">
      <div>
        <h5 className="todo-card-title">{title || "Untitled Task"}</h5>
        <p className="todo-card-body">{body || "No description provided for this task."}</p>
        
        <div className="todo-actions">
          <button className="btn-update" onClick={() => display({ id, title, body })}>
            Update
          </button>
          <button className="btn-delete" onClick={() => delid(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
