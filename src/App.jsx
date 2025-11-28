import { useEffect, useState } from "react";
import Main from "./Main.jsx";
import Header from "./Header.jsx";

export default function App() {
  const [toDo, setToDo] = useState(
    JSON.parse(localStorage.getItem("toDo")) || []
  );
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("progress")) || []
  );
  const [done, setDone] = useState(
    JSON.parse(localStorage.getItem("done")) || []
  );

  // 2. Save automatically
  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

  return (
    <>
      <Header setToDo={setToDo} />
      <Main
        toDo={toDo}
        setToDo={setToDo}
        progress={progress}
        setProgress={setProgress}
        done={done}
        setDone={setDone}
      />
    </>
  );
}
