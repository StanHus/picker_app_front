import { Fragment } from "react";
import "../../css/style.css";
import { useState, useEffect } from "react";
import { put, get } from "./requests";
import { checkSubmission, getResult, shuffle } from "./functions";
import Winner from "../Winner";

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
    const data = await get();
    setList(shuffle(data["text"].split(",")));
    setId(data["id"]);
  };

  useEffect(() => {
    getTitles();
  }, []);

  const handleSubmit = async () => {
    if (
      list.length / selected.length === 2 &&
      checkSubmission(selected) &&
      selected.length > 0
    ) {
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
            Choose wisely (<i>read</i> correctly)
          </h2>
        )}
        {
          // eslint-disable-next-line
          <a onClick={() => handleSubmit()} className="button1" id="exit">
            Submit Choices
          </a>
        }
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
                  <p style={{ marginRight: "4vw", textAlign: "center" }}>VS</p>
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
      </Fragment>
    );
  }
}
