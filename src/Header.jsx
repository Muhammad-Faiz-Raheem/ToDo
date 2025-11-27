import { useState } from "react";

export default function Header({ setToDo }) {
  const [task, setTask] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const addToDo = (item) => {
    //setToDo(prevItems => [...prevItems, item+' '+(prevItems.length+1)]);
    if (!item) {
      setShowError(true);
      return;
    }
    setToDo((prevItems) => [...prevItems, item]);
    setShowPopUp(false);
    setTask("");
    setShowError(false);
  };

  return (
    <>
      <div className="header">
        <div className="add">
          <h5 onClick={() => setShowPopUp(true)}>Add Task</h5>
        </div>
        {showPopUp ? (
          <div className="input">
            <div className="box">
              <label>Enter Task Name:</label>
              <input
                type="text"
                value={task}
                onChange={(e) => {
                  setShowError(false);
                  setTask(e.target.value);
                }}
              />
              {showError ? (
                <span className="error">enter a value first</span>
              ) : (
                ""
              )}
              <div className="btn">
                <button onClick={() => addToDo(task)}>Submit</button>
                <button onClick={() => setShowPopUp(false)}>Close</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="title">
          <h1>Accelerate You Work</h1>
        </div>
      </div>
    </>
  );
}
