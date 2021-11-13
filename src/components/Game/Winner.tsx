import { Fragment } from "react";
import "../../css/style.css";
import ShowConfetti from "./Confetti";

export default function Winner({ winner }: any) {
  return (
    <Fragment>
      <ShowConfetti />
      <h1 style={{ marginTop: "20%", background: "transparant" }}>
        Winner: {winner}
      </h1>
      <a href="/input" id="exit" className="button1">
        Start Over
      </a>
    </Fragment>
  );
}
