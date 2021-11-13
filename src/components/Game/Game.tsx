import { Fragment } from "react";
import "../../css/style.css";
import { useState, useEffect } from "react";
import { put } from "./requests";
import { checkSubmission, getResult, shuffle } from "./functions";
import Winner from "./Winner";

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
      setList(shuffle(jsonData[0]["text"].split(",")));
      setId(jsonData[0]["id"]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTitles();
  }, []);

  const handleSubmit = async () => {
    if (checkSubmission(selected)) {
      let result = await getResult(list, selected);
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
        <Winner winner={list[0]} />
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
        {
          // eslint-disable-next-line
          <a onClick={() => handleSubmit()} className="button1" id="exit">
            Submit Choices
          </a>
        }
        <div>
          {
            // eslint-disable-next-line
            list.map((_, index) => {
              if (index === 0 || index % 2 === 0) {
                return (
                  <section className="checkboxes">
                    <article className="feature">
                      <input
                        onChange={() => handleChange(index)}
                        type="checkbox"
                      />
                      <div>
                        <span>{list[index]}</span>
                      </div>
                    </article>

                    <article className="feature">
                      <input
                        onChange={() => handleChange(index + 1)}
                        type="checkbox"
                      />
                      <div>
                        <span>{list[index + 1]}</span>
                      </div>
                    </article>
                  </section>
                );
              }
            })
          }
        </div>
      </Fragment>
    );
  }
}
