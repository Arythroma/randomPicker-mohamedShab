import { useEffect, useReducer, useState } from "react";

const initialState = {
  items: JSON.parse(localStorage.getItem("items")) || [],
  isPlaying: false,
  result: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.payload] };
    case "DELETE":
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    case "PLAY":
      return { ...state, isPlaying: !state.isPlaying, result: null };
    case "PICK":
      return {
        ...state,
        result: action.payload,
        isPlaying: false,
      };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

function getRandomItem(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function RandomPicker() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state.items));
  }, [state.items]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return alert("no input");
    if (state.items.includes(trimmed)) return alert("item already exists");

    dispatch({ type: "ADD", payload: trimmed });
    setInput("");
  }

  function handleDelete(item) {
    dispatch({ type: "DELETE", payload: item });
  }

  function handlePlay() {
    if (state.items.length < 2)
      return alert("minimum 2 items required to play");
    dispatch({ type: "PLAY" });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
    localStorage.setItem("items", JSON.stringify([]));
  }

  useEffect(() => {
    let intervalId, timeoutId;

    if (state.isPlaying) {
      intervalId = setInterval(() => {
        const randomItem = getRandomItem(state.items);
        setCurrentDisplay(randomItem);
      }, 100);

      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        const finalPick = getRandomItem(state.items);
        dispatch({ type: "PICK", payload: finalPick });
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [state.isPlaying, state.items]);

  return (
    <div className="container">
      <h2>
        {state.isPlaying
          ? currentDisplay || "..."
          : state.result || "add items and pick one"}
      </h2>

      {!state.isPlaying && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter item"
            />
            <button type="submit">Add</button>
            <button
              type="button"
              onClick={handlePlay}
              disabled={state.items.length < 2}
            >
              Pick Random
            </button>
            <button
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>

          <ul>
            {state.items.map((item) => (
              <li key={item}>
                {item}
                <button onClick={() => handleDelete(item)}>✕</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default RandomPicker;
