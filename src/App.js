import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { todosContext } from "./context/todosContext";

const initialTodo = [
  {
    id: uuidv4(),
    title: " مهمة جديدة",
    details: "قراءة كتاب جديد في 10 ايام",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "صوم رمضان",
    details: "قراءة كتاب جديد في 30 ايام",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الدهاب للمقهى",
    details: "قراءة كتاب جديد في 1 ايام",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodo);
  return (
    <div>
      <todosContext.Provider value={{todos , setTodos }}>
        <TodoList />
      </todosContext.Provider>
    </div>
  );
}

export default App;
