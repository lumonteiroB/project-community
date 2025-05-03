import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "success", // 'success' | 'error' | 'warning' | 'info'
    title: "",
    message: "",
  });

  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-full max-w-md rounded-lg p-6 shadow-xl bg-slate-100"
          >
            <h3 className={`text-lg font-bold ${
              alert.type === "success"
                ? " text-green-900"
                : alert.type === "error"
                ? " text-red-900"
                : " text-blue-900"
            }`}>{alert.title}</h3>
            <p className="mt-2">{alert.message}</p>
            <button
              onClick={closeAlert}
              className="mt-4 px-4 py-2 rounded bg-white hover:bg-opacity-90"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
