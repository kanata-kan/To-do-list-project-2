import "./App.css";
import TodoList from "./TodoList";
import { ToastProvider } from "./context/ToastContext";
import TodosProvider from "./context/TodosContext";


function App() {

  return (
    <div>

      <TodosProvider>
        <ToastProvider>
          <TodoList />
        </ToastProvider>
      </TodosProvider>
    </div>
  );
}

export default App;
