import { v4 as uuidv4 } from "uuid";

export default function ReducerTodo(currentTodo, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const todosAdd = [...currentTodo, newTodo];
      localStorage.setItem("key", JSON.stringify(todosAdd));
      return todosAdd;
    }
    case "deleted": {
      const deleteTodos = currentTodo.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("key", JSON.stringify(deleteTodos));
      return deleteTodos;
    }
    case "updated": {
      const updateTodo = currentTodo.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("key", JSON.stringify(updateTodo));
      return updateTodo;
    }
    case "get": {
      const storageEffect = JSON.parse(localStorage.getItem("key")) || [];
      return storageEffect;
    }
    case "isCompleted": {
      const updatedTodos = currentTodo.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            isCompleted: !t.isCompleted, // تغيير حالة isCompleted
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("key", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw Error("Error in currentTodo: " + currentTodo);
    }
  }
}
