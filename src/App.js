import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "components/Header";
import Form from "components/Form";
import TaskSection from "components/TaskSection";

import { get, taskKey } from "localStorage/localStorage";

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    const dataBase = await get(taskKey);

    if (dataBase) {
      setState(dataBase);
    }
  };
  return (
    <>
      <Header />
      <Form setState={setState} />
      <TaskSection data={state} setState={setState} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
