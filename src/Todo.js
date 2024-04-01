import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import { useThispatch } from "./context/TodosContext";
import { useToast } from "./context/ToastContext";

export default function Todo({ todo, handleDelete, handleUpdate }) {
  const thispatch  = useThispatch();
  const { showHideToast } = useToast();

  //==================={handle Check}=====================//
  const isCompleted = todo.isCompleted;

  function handleCheckClicked() {
    thispatch({type :"isCompleted" , payload : todo})
    showHideToast(
      todo.isCompleted
        ? "تمت الإضافة للمهام المنجزة"
        : "تمت الإزالة من المهام المنجزة"
    );
  }
  //===================//{handle Check}//===================//

  function handleClickOpenDelete() {
    handleDelete(todo);
  }
  function handleClickOpenUpdate() {
    handleUpdate(todo);
  }

  return (
    <>
      <div
        className="container-todo"
        style={{ background: todo.isCompleted ? "#c62828" : "" }}
      >
        <div className="todo-content-a">
          <h2
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </h2>

          <p>{todo.details}</p>
        </div>
        <div className="todo-content-b">
          {/* ============/ Delete Button \ =========== */}
          <button
            style={{ border: "solid red 3px", color: "red" }}
            className="btn"
            onClick={handleClickOpenDelete}
          >
            <DeleteOutlineIcon />
          </button>
          {/* ============/ Update Button \ =========== */}
          <button
            style={{ border: "solid blue 3px", color: "blue" }}
            className="btn"
            onClick={handleClickOpenUpdate}
          >
            <CreateIcon />
          </button>
          {/* ============/ Check Button \ =========== */}
          <button
            style={{
              background: isCompleted ? "green" : "white",
              border: isCompleted ? "solid white 3px" : "solid green 3px",
              color: isCompleted ? "white" : "green",
            }}
            className="btn"
            onClick={handleCheckClicked}
          >
            <CheckIcon />
          </button>
        </div>
      </div>
    </>
  );
}
