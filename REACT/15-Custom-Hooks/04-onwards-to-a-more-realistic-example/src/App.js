import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHtpp from "./hooks/use-http";

function App() {
  const URL = "https://react-http-76b5e-default-rtdb.firebaseio.com/tasks.json";
  const [tasks, setTasks] = useState([]);

  //with useCallback we're guaranteeing that transformTasks will not change all the time
  const transformTasks = (taskObj) => {
    const loadedTasks = [];
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const {
    isLoading,
    error,
    // "alias" will be fetchTasks
    sendRequest: fetchTasks,
  } = useHtpp();
  // {URL} this obj will be recreating all the time whenever the app component is re-evaluated, we could use useMemo to ensure that this object doen't change all the time or we change our custom hook

  useEffect(() => {
    fetchTasks({url:URL} ,transformTasks);
  }, [fetchTasks]);
  //functions are object in JS and every time a function is recreated  even if it contains the same logic it's a brand new object in memory  and therefore useEffect would treat it as a new value , even if it's technically the same function  and it would re execute it, to avoid this go to useHttpRequest and wrap it with useCallback

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
