import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import InputTitles from "./components/InputPage";
import Landing from "./components/Landing_Page";
import "./css/style.css";

export default function App() {
  return (
    <div className="background">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/input">
              <InputTitles />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
