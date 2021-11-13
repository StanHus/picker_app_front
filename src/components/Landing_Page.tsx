import { Fragment } from "react";
import "../css/style.css";

export default function Landing() {
  return (
    <Fragment>
      <div className="landing-body">
        <h1 className="title">Battle Royale</h1>
        <p className="subTitle">
          Ok, so I love the process of elimination. I also love empirically
          finding out what which song/episode/character I really think is best.
          Thats why I created this app to simplify the process!{" "}
          <a
            style={{
              textDecoration: "none",
              color: "white",
              animation: "color-change 2s infinite",
            }}
            href="/input"
          >
            Input
          </a>{" "}
          the candidates and then pick the best out of each pair!
        </p>
      </div>
    </Fragment>
  );
}
