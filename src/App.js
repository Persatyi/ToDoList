import { useEffect, useState } from "react";

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
      <Form />
      <TaskSection data={state} setState={setState} />
    </>
  );
}

export default App;
