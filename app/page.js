"use client";

export default function Home() {
    const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  const [value, setValue] = useState("");

  const [toggle, setToggle] = useState(0); // its toggled filter type

  const filters = ["All", "Active", "Completed"];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCompleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: value,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (i) => {
    setToggle(i);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleFilterByActive = () => {
    if (filters[toggle] === "All") {
      return tasks;
    } else if (filters[toggle] === "Active") {
      return tasks.filter((task) => task.completed === false);
    } else if (filters[toggle] === "Completed") {
      return tasks.filter((task) => task.completed === true);
    }
  };

  const todos = handleFilterByActive();

  const handlerClearCompleted = () => {
    const uncompleted = tasks.filter((t) => t.completed === false);
    console.log(uncompleted);
    setTasks(uncompleted);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <div className="mb-4 flex justify-between items-center text-sm text-gray-400">
          <span> {tasks.length} items left</span>{" "}
          <div>
            {filters.map((fl, index) => (
              <button
              key={index}
                onClick={() => {
                  handleToggleTask(index);
                }}
                className={`mr-2 ${toggle === index ? "text-white" : ""}`}
              >
                {fl}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlerClearCompleted()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
        <TaskList handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} tasks={todos} />
      </div>
    </div>
  );
}


