import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import ShowSnackbar from "../ShowSnackbar";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <ShowSnackbar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
