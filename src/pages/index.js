import { getSession, signOut } from "next-auth/react";
import TaskForm from "../components/TaskForm";
import { useState, useEffect } from "react";

export default function Home({ user }) {
  const [allTasks, setAllTasks] = useState([]);

  const getTasks = async () => {
    const res = await fetch("https://next-auth-task.netlify.app/api/task");

    const data = await res.json();

    if (data.success) {
      setAllTasks(data.tasks);
    }
    console.log(data);
  };

  const deleteTask = async (id) => {
    const res = await fetch(
      `https://next-auth-task.netlify.app/api/task/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      getTasks();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="center-all-col bg-primary">
      <img src={user.image} alt={user.name} width={200} />
      <h1 className="text-white">
        Welcome{" "}
        <a className="text-blue" href="#!">
          {user.name}
        </a>
      </h1>

      <button className="btn btn-red" onClick={() => signOut()}>
        Exit
      </button>

      <TaskForm get={getTasks} />

      <br />
      <br />
      <h2 className="text-blue">Your Tasks</h2>
      {allTasks.length !== 0 &&
        allTasks.map((task, i) => (
          <div className="card text-white" key={i}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <button
              onClick={() => deleteTask(task._id)}
              className="btn btn-red"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };

  return {
    props: {
      user: session.user,
    },
  };
};
