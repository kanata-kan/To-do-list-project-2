import React, { useReducer, createContext, useContext } from "react";
import ReducerTodo from "../Reducer/ReducerTodo";

const TodosContext = createContext([]);
const ThispatchContext = createContext(() => {}); 

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(ReducerTodo, []);
  
  return (
    <TodosContext.Provider value={todos}>
      <ThispatchContext.Provider value={dispatch}>
        {children}
      </ThispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};

export const useThispatch = () => {
  const context = useContext(ThispatchContext);
  if (!context) {
    throw new Error("useThispatch must be used within a TodosProvider");
  }
  return context;
};

export default TodosProvider;
