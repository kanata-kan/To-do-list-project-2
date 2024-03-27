import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import { todosContext } from "./context/todosContext";
import { useContext, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(todosContext);
  const [open, setOpen] = useState(false);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [updatedInput, setUpdatedInput] = useState({title: todo.title, details: todo.details});

  //==================={handle Check}=====================//
  const isCompleted = todo.isCompleted;

  function handleCheckClicked() {
    const updateTodo = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodo);
    localStorage.setItem( "key"  , JSON.stringify( updateTodo))
  }
  //===================//{handle Check}//===================//
  //==================={handle delete}=====================//
  function handleCloseDelete() {
    setOpen(false);
  }
  function handleClickOpenDelete() {
    setOpen(true);
  }
  function handleDeleteConfirm() {
    const deleteTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(deleteTodos);
    localStorage.setItem( "key"  , JSON.stringify( deleteTodos))
  }
  //===================//{handle delete}//=====================//
  //==================={handle update}=====================//
  function handleCloseUpdate() {
    setUpdateOpen(false);
  }
  function handleClickOpenUpdate() {
    setUpdateOpen(true);
  }
  function handleUpdateConfirm() {
    const updateTodo = todos.map((t)=>{
      if(t.id === todo.id){
        return {...t , title : updatedInput.title , details : updatedInput.details}
      }else{
        return t
      }
    })
    setTodos(updateTodo)
    setUpdateOpen(false);
    localStorage.setItem( "key"  , JSON.stringify( updateTodo))
  }
  //===================//{handle update}//=====================//
  return (
    <>
      <div className="container-todo" style={{background : todo.isCompleted ? "#c62828" : ""}}>
        <div className="todo-content-a">
        <h2 style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>{todo.title}</h2>

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
      {/*==================={Model Delete}=============================*/}
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
      {/*===================//{Model Delete}//=============================*/}
      {/*==================={Model Update}=============================*/}
      <Dialog open={UpdateOpen} onClose={handleCloseUpdate}>
        <DialogTitle>{"هل أنت متأكد أنك تريد تعديل هذه المهمة ؟"}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: "10px" }}
            label="عنوان المهمه"
            placeholder="اكتب مهمة جديدة..."
            value={updatedInput.title}
            onChange={(e)=>{
              setUpdatedInput({...updatedInput , title : e.target.value})
            }}
          />
          <br />
          <TextField
            style={{ marginTop: "10px" }}
            label="محتوى مهمه"
            placeholder="اكتب مهمة جديدة..."
            value={updatedInput.details}
            onChange={(e)=>{
              setUpdatedInput({...updatedInput , details : e.target.value})
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
      {/*===================//{Model Update}//=============================*/}
    </>
  );
}
