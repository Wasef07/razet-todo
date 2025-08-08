import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="d-flex"><h1>About Us</h1></div>
        <p>
          Welcome to <b>RaZet</b> — a task management app built with passion, purpose, and a developer’s drive to simplify everyday productivity.
          <br /><br />
          At RaZet, we believe that staying organized should feel effortless. Whether you’re a student balancing assignments, a professional managing deadlines, or simply someone looking to stay on top of daily tasks — our goal is to make your workflow clear, distraction-free, and empowering.
          <br /><br />
          What makes RaZet different? It’s intentionally minimal, yet powerful. We stripped away unnecessary clutter and focused on what truly matters — speed, clarity, and reliability. The app helps you plan, prioritize, and track your to-dos with ease, so you can focus more on getting things done and less on managing them.
          <br /><br />
          <b>RaZet</b> is built using the modern and robust <b>MERN</b> architecture — <b>React</b> for a fast, dynamic front-end, <b>Node.js</b> and <b>Express</b> for efficient back-end handling, and <b>PostgreSQL</b> for a scalable and secure relational database.
          <br /><br />
          This project is more than just code — it’s a reflection of a developer’s journey, curiosity, and the desire to solve real-life problems through tech. RaZet is continuously evolving, and every feature is crafted with the user in mind.
          <br /><br />
          Thank you for being here. Whether you're organizing your first task or building a new habit, we hope RaZet makes your day a little simpler and a lot more productive.
          <br /><br />
          <i>— Built and maintained with ❤️ by Raze</i>
        </p>
      </div>
    </div>
  );
};

export default About;
