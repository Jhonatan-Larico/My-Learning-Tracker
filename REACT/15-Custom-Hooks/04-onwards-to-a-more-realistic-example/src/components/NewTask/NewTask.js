import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHtpp from "../../hooks/use-http";

const NewTask = (props) => {
  const URL = "https://react-http-76b5e-default-rtdb.firebaseio.com/tasks.json";

  const createTask = (taskText,taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const { isLoading, error, sendRequest: senTaskRequest } = useHtpp();

  const enterTaskHandler = async (taskText) => {

    senTaskRequest({
      url: URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText },
    },createTask.bind(null,taskText)
    );

  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
