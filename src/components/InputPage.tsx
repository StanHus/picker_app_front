import { Fragment, useState } from "react";
import "../css/style.css";

export default function InputTitles() {
  const [titles, setTitles] = useState<string[]>([]);
  const [entry, setEntry] = useState("");
  const [alert, setAlert] = useState(false);
  const [add, setAdd] = useState(0);
  const [remove, setRemove] = useState(0);

  function nearestSmallestPowerOf2(n: number) {
    return 1 << (31 - Math.clz32(n));
  }

  function nearestBiggestPowOf2(v: number) {
    v--;
    v |= v >> 1;
    v |= v >> 2;
    v |= v >> 4;
    v |= v >> 8;
    v |= v >> 16;
    return v++;
  }

  const executeSubmission = async () => {
    if (
      titles.length === 64 ||
      titles.length === 32 ||
      titles.length === 16 ||
      titles.length === 8
    ) {
      try {
        await fetch("https://dry-gorge-37048.herokuapp.com/input", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: titles.join(","),
          }),
        });
        window.location.href = "/game";
      } catch (err) {
        console.error(err);
      }
    } else {
      setRemove(titles.length - nearestSmallestPowerOf2(titles.length));
      setAdd(nearestBiggestPowOf2(titles.length) - titles.length + 1);
      setTimeout(() => {
        setAlert(true);
      }, 1000);
    }
  };

  return (
    <Fragment>
      <h1 className="title">Input all the titles</h1>
      <div className="panel">
        <input
          className="input"
          placeholder="Input your titles one at a time"
          type="text"
          value={entry}
          onSubmit={() => {
            if (typeof entry === "string" && entry !== "") {
              setTitles(() => [...titles, `${entry}`]);
              setEntry("");
            }
          }}
          onChange={e => {
            setAlert(false);
            setEntry(e.target.value);
          }}
        />
        {entry !== "" && (
          <button
            onClick={() => {
              if (typeof entry === "string" && entry !== "") {
                setTitles(() => [...titles, `${entry}`]);
                setEntry("");
              }
            }}
            className="button"
          >
            Add
          </button>
        )}
        {titles.length > 0 && (
          <button
            onClick={() => setTitles(() => titles.slice(0, titles.length - 1))}
            className="button"
          >
            Undo
          </button>
        )}
        {titles.length > 0 && (
          <button onClick={() => executeSubmission()} className="button">
            Submit
          </button>
        )}
      </div>
      {alert && (
        <h2 style={{ fontSize: "xx-large", textAlign: "center" }}>
          Not a good number remove {remove} or add {add} entires
        </h2>
      )}
      {titles.length > 0 && (
        <ol className="list">
          {titles.map((title: string) => {
            return (
              <li>
                <p>{title}</p>
              </li>
            );
          })}
        </ol>
      )}
    </Fragment>
  );
}
