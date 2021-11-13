import { check } from "./Game/functions";
import { post } from "./Game/requests";
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
    let entries = titles.join(",").split(",");
    let titlesJoined = titles.join(",");

    if (check(entries.length)) {
      post(titlesJoined);
    } else {
      setRemove(entries.length - nearestSmallestPowerOf2(entries.length));
      setAdd(nearestBiggestPowOf2(entries.length) - entries.length + 1);
      setTimeout(() => {
        setAlert(true);
      }, 1000);
    }
  };

  return (
    <Fragment>
      <h1 className="title">Input all the titles</h1>
      <div className="panel">
        {titles.length > 0 && (
          // eslint-disable-next-line
          <a onClick={() => executeSubmission()} className="button1">
            Submit
          </a>
        )}
        <input
          className="input"
          placeholder="Input titles separated by a coma or 1 by 1"
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
          // eslint-disable-next-line
          <a
            onClick={() => {
              if (typeof entry === "string" && entry !== "") {
                setTitles(() => [...titles, `${entry}`]);
                setEntry("");
              }
            }}
            className="button1"
          >
            Add
          </a>
        )}
        {titles.length > 0 && (
          // eslint-disable-next-line
          <a
            onClick={() => setTitles(() => titles.slice(0, titles.length - 1))}
            className="button1"
          >
            Undo
          </a>
        )}
      </div>
      {alert && (
        <h2 style={{ fontSize: "xx-large", textAlign: "center" }}>
          Not a good number remove {remove} or add {add} entires
        </h2>
      )}
      {titles.length > 0 && (
        <ol className="list">
          {titles
            .join(",")
            .split(",")
            .map((title: string) => {
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
