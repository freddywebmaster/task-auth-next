import { useState } from "react";

const TaskForm = ({ get }) => {
  const initialState = {
    title: "",
    description: "",
  };
  const [task, setTask] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://next-auth-task.netlify.app/api/task", {
        method: "POST",
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (data.success) {
        setTask(initialState);
        alert(data.message);
        get();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="center-all-col card text-white" onSubmit={onSubmit}>
      <h2 className="text-blue">Add new task</h2>
      <input
        value={task.title}
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="Title Task"
      />
      <textarea
        value={task.description}
        onChange={handleChange}
        name="description"
        placeholder="Description Task"
      ></textarea>
      <button className="btn btn-blue" type="submit">
        Save
      </button>
    </form>
  );
};

export default TaskForm;
