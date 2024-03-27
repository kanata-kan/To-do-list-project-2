import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { todosContext } from "./context/todosContext";
import { useContext } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(todosContext);
  const [titleInput, setTitleInput] = useState("");
  const [assessingTasks, setAssessingTasks] = useState("all");

  const completedTodo = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodo = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todoIsCompleted = todos;

  if (assessingTasks === "completed") {
    todoIsCompleted = completedTodo;
  } else if (assessingTasks === "notCompleted") {
    todoIsCompleted = notCompletedTodo;
  }

  const todosJSX = todoIsCompleted.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  //============{handle Add Clickd }================//
  function handleAddClickd() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const todosAdd = [...todos, newTodo];
    setTodos(todosAdd);
    localStorage.setItem("key", JSON.stringify(todosAdd));
    setTitleInput("");
  }
  // useEffect to load todos from local storage on component mount
  useEffect(() => {
    const storageEffect = JSON.parse(localStorage.getItem("key"));
    if (Array.isArray(storageEffect)) {
      setTodos(storageEffect);
    } else {
      setTodos([]);
    }
  }, [setTodos]);
  //============//{handle Add Clickd }//================//

  return (
    <>
      <Container maxWidth="md">
        <div className="Content">
          {/* Page title */}
          <h1>مهامي</h1>
          <hr />
          {/* ButtonGroup for filtering tasks */}
          <ButtonGroup
            style={{
              display: "flex",
              justifyContent: "center",
              direction: "ltr",
            }}
            aria-label="Basic button group"
            value={assessingTasks}
            onClick={(e) => {
              setAssessingTasks(e.target.value);
            }}
          >
            {/* Button for not completed tasks */}
            <Button
              style={{
                background:
                  assessingTasks === "notCompleted"
                    ? "rgba(26, 194, 26, 0.505)"
                    : "",
              }}
              value="notCompleted"
            >
              الغير منجز
            </Button>
            {/* Button for completed tasks */}
            <Button
              style={{
                background:
                  assessingTasks === "completed"
                    ? "rgba(26, 194, 26, 0.505)"
                    : "",
              }}
              value="completed"
            >
              المنجز
            </Button>
            {/* Button for all tasks */}
            <Button
              style={{
                background:
                  assessingTasks === "all" ? "rgba(26, 194, 26, 0.505)" : "",
              }}
              value="all"
            >
              الكل
            </Button>
          </ButtonGroup>
          {/* Render todos based on the selected filter */}
          <div className="todo-list">{todosJSX}</div>
          {/* Text field and button for adding new todos */}
          <div className="textField">
            <TextField
              label="اضافه مهمه"
              style={{ width: "75%" , direction : "ltr"}}
              placeholder="اكتب مهمة جديدة..."
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
              className="text-field"
            />
            <Button
              style={{
                width: "20%",
                padding: "10px 10px",
                marginRight: "15px",
                fontSize: "20px",
              }}
              className="btn-field"
              disabled={titleInput === ""}
              variant="contained"
              onClick={() => {
                handleAddClickd();
              }}
            >
              اضافة
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
