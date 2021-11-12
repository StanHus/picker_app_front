import { Fragment } from "react";
import "../css/style.css";
import { useState, useEffect } from "react";
import { put } from "./requests";
import { getResult } from "./functions";

export default function Game() {
  const [list, setList] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [id, setId] = useState<number>();
  const [alert, setAlert] = useState(false);

  const handleChange = (item: number) => {
    setAlert(false);
    !selected.includes(item)
      ? setSelected(() => [...selected, item])
      : setSelected(selected.filter(num => num !== item));
  };

  const getTitles = async () => {
    try {
      const response = await fetch(
        "https://dry-gorge-37048.herokuapp.com/titles"
      );
      const jsonData = await response.json();
      setList(jsonData[0]["text"].split(","));
      setId(jsonData[0]["id"]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTitles();
  }, []);

  const handleSubmit = async () => {
    console.log(selected);
    if (selected.length % 2 === 0 || selected.length === 1) {
      //condition under review
      let result = await getResult(list, selected);
      console.log(result);
      console.log(id);
      setTimeout(() => {
        put(result, id);
      }, 500);
    } else {
      setAlert(true);
    }
  };

  if (list.length === 1) {
    return (
      <Fragment>
        <h1>Winner: {list[0]}</h1>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {alert && (
          <h2 style={{ fontSize: "xx-large", textAlign: "center" }}>
            Choose wisely (read correctly)
          </h2>
        )}
        <button
          onClick={() => handleSubmit()}
          style={{ width: "30%", marginLeft: "35%", height: "10vh" }}
        >
          Submit Choices
        </button>

        {
          // eslint-disable-next-line
          list.map((_, index) => {
            if (index === 0 || index % 2 === 0) {
              return (
                <div className="titlesPair">
                  <div className="titleComponent">
                    <input
                      onChange={() => handleChange(index)}
                      type="checkbox"
                    />
                    <label>{list[index]}</label>
                  </div>
                  <div className="titleComponent">
                    <input
                      onChange={() => handleChange(index + 1)}
                      type="checkbox"
                    />
                    <label>{list[index + 1]}</label>
                  </div>
                </div>
              );
            }
          })
        }
      </Fragment>
    );
  }
}
