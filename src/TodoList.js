import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Todo from "./Todo";

import { useState, useEffect, useMemo } from "react";
import { useToast } from "./context/ToastContext";
import { useTodos , useThispatch } from "./context/TodosContext";


export default function TodoList() {
  const { showHideToast } = useToast();
  const [titleInput, setTitleInput] = useState("");
  const [assessingTasks, setAssessingTasks] = useState("all");
  const [open, setOpen] = useState(false);
  const [todoDialog, setTodoDialog] = useState(null);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const todos = useTodos();
  const thispatch = useThispatch();

  // Memoized filtering functions
  const completedTodo = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  const notCompletedTodo = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  let todoIsCompleted = todos;

  if (assessingTasks === "completed") {
    todoIsCompleted = completedTodo;
  } else if (assessingTasks === "notCompleted") {
    todoIsCompleted = notCompletedTodo;
  }

  // Handle Add Clicked
  function handleAddClickd() {
    thispatch({ type: "added", payload: { title: titleInput } });
    setTitleInput("");
    showHideToast("لقد تم اضافه مهمه جديده بنجاح");
  }

  // useEffect to load todos from local storage on component mount
  useEffect(() => {
    thispatch({ type: "get" });
  }, []);

  // Handle Delete
  function handleCloseDelete() {
    setOpen(false);
  }

  function handleDelete(todo) {
    setTodoDialog(todo);
    setOpen(true);
  }

  function handleDeleteConfirm() {
    thispatch({ type: "deleted", payload: todoDialog });
    handleCloseDelete();
    showHideToast("لقد تم حذف المهمه بنجاح");
  }

  // Handle Update
  function handleCloseUpdate() {
    setUpdateOpen(false);
  }

  function handleUpdate(todo) {
    setTodoDialog(todo);
    setUpdateOpen(true);
  }

  function handleUpdateConfirm() {
    thispatch({ type: "updated", payload: todoDialog });
    setUpdateOpen(false);
    showHideToast("لقد تم التعديل على المهمه بنجاح");
  }

  const todosJSX = todoIsCompleted.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));

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
              style={{ width: "75%", direction: "ltr" }}
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
      {/* Delete Dialog */}
      <Dialog open={open} onClose={handleCloseDelete}>
        <DialogTitle>{"هل أنت متأكد أنك تريد حذف هذه المهمة ؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            اذا قمت بالموافقه على حذف هذه العمليه فلا يمكنك التراجع عن ذلك
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ border: "red solid 2px", color: "red" }}
            onClick={handleDeleteConfirm}
          >
            قم بالحذف
          </Button>
          <Button onClick={handleCloseDelete} autoFocus>
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Dialog open={UpdateOpen} onClose={handleCloseUpdate}>
        <DialogTitle>{"هل أنت متأكد أنك تريد تعديل هذه المهمة ؟"}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: "10px" }}
            label="عنوان المهمه"
            placeholder="اكتب مهمة جديدة..."
            value={todoDialog && todoDialog.title}
            onChange={(e) => {
              setTodoDialog({ ...todoDialog, title: e.target.value });
            }}
          />
          <br />
          <TextField
            style={{ marginTop: "10px" }}
            label="محتوى مهمه"
            placeholder="اكتب مهمة جديدة..."
            value={todoDialog && todoDialog.details}
            onChange={(e) => {
              setTodoDialog({ ...todoDialog, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ border: "green solid 2px", color: "green" }}
            onClick={handleUpdateConfirm}
          >
            تعديل
          </Button>
          <Button onClick={handleCloseUpdate} autoFocus>
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
