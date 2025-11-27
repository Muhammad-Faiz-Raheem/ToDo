import { useState } from "react";

export default function Main({
  toDo,
  setToDo,
  progress,
  setProgress,
  done,
  setDone,
}) {
  const [dragData, setDragData] = useState(null);
  const [dragOverSlide, setDragOverSlide] = useState(null);

  const removeItemImmutably = (list, indexToRemove) => {
    return list.filter((_, index) => index !== indexToRemove);
  };

  const toDoComplete = (index) => {
    const item = toDo[index];
    setToDo(removeItemImmutably(toDo, index));
    setProgress((prevItems) => [...prevItems, item]);
  };

  const toDoRemove = (index) => {
    setToDo(removeItemImmutably(toDo, index));
  };

  const progressComplete = (index) => {
    const item = progress[index];
    setProgress(removeItemImmutably(progress, index));
    setDone((prevItems) => [...prevItems, item]);
  };

  const progressRemove = (index) => {
    const item = progress[index];
    setProgress(removeItemImmutably(progress, index));
    setToDo((prevItems) => [...prevItems, item]);
  };

  const doneComplete = (index) => {
    setDone(removeItemImmutably(done, index));
  };

  const doneRemove = (index) => {
    const item = done[index];
    setDone(removeItemImmutably(done, index));
    setProgress((prevItems) => [...prevItems, item]);
  };

  const handleDragStart = (listName, index) => {
    setDragData({ listName, index });
  };

  const handleDragOver = (e, slideName) => {
    e.preventDefault(); // allow drop
    setDragOverSlide(slideName);
  };

  const handleDragLeave = () => {
    setDragOverSlide(null);
  };

  const handleDrop = (targetListName) => {
    if (!dragData) return;

    const { listName, index } = dragData;

    if (listName === targetListName) return;

    let item;

    if (listName === "todo") {
      item = toDo[index];
      setToDo(removeItemImmutably(toDo, index));
    } else if (listName === "progress") {
      item = progress[index];
      setProgress(removeItemImmutably(progress, index));
    } else if (listName === "done") {
      item = done[index];
      setDone(removeItemImmutably(done, index));
    }

    if (targetListName === "todo") {
      setToDo((p) => [...p, item]);
    }
    if (targetListName === "progress") {
      setProgress((p) => [...p, item]);
    }
    if (targetListName === "done") {
      setDone((p) => [...p, item]);
    }

    setDragData(null);
    setDragOverSlide(null);
  };

  return (
    <>
      <div className="main">
        <div
          className={`slide ${dragOverSlide === "todo" ? "highlight" : ""}`}
          onDragOver={(e) => handleDragOver(e, "todo")}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop("todo")}
        >
          <span className="count">{toDo.length}</span>
          <h2>To do</h2>
          {toDo.length !== 0 ? (
            <div className="items">
              {toDo.map((item, index) => (
                <div
                  key={index}
                  className="item"
                  draggable
                  onDragStart={() => handleDragStart("todo", index)}
                >
                  <div>
                    <span className="index">{index + 1}.</span>
                    <span
                      className="complete"
                      onClick={() => toDoRemove(index)}
                    >
                      ❌
                    </span>
                    <p className="itemName">{item} </p>
                    <span
                      className="complete"
                      onClick={() => toDoComplete(index)}
                    >
                      ✅
                    </span>
                  </div>
                  <div className="pick">🫳🏻</div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`slide ${dragOverSlide === "progress" ? "highlight" : ""}`}
          onDragOver={(e) => handleDragOver(e, "progress")}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop("progress")}
        >
          <span className="count">{progress.length}</span>
          <h2>Progress</h2>
          {progress.length !== 0 ? (
            <div className="items">
              {progress.map((item, index) => (
                <div
                  key={index}
                  className="item"
                  draggable
                  onDragStart={() => handleDragStart("progress", index)}
                >
                  <div>
                    <span className="index">{index + 1}.</span>
                    <span
                      className="complete"
                      onClick={() => progressRemove(index)}
                    >
                      🔙
                    </span>
                    <p className="itemName">{item} </p>
                    <span
                      className="complete"
                      onClick={() => progressComplete(index)}
                    >
                      ✅
                    </span>
                  </div>
                  <div className="pick">🫳🏻</div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`slide ${dragOverSlide === "done" ? "highlight" : ""}`}
          onDragOver={(e) => handleDragOver(e, "done")}
          onDragLeave={handleDragLeave}
          onDrop={() => handleDrop("done")}
        >
          <span className="count">{done.length}</span>
          <h2>Done</h2>
          {done.length !== 0 ? (
            <div className="items">
              {done.map((item, index) => (
                <div
                  key={index}
                  className="item"
                  draggable
                  onDragStart={() => handleDragStart("done", index)}
                >
                  <div>
                    <span className="index">{index + 1}.</span>
                    <span
                      className="complete"
                      onClick={() => doneRemove(index)}
                    >
                      🔙
                    </span>
                    <p className="itemName">{item} </p>
                    <span
                      className="complete"
                      onClick={() => doneComplete(index)}
                    >
                      ✅
                    </span>
                  </div>
                  <div className="pick">🫳🏻</div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
