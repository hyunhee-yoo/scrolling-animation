import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { throttle } from "lodash";
import "./App.scss";

const Screen = ({ index }) => {
  return (
    <TransitionGroup className="screen-transition">
      <CSSTransition key={index} timeout={300} classNames="show">
        <div className={index ? `screen screen-${index}` : "screen"} />
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const { scrollTop } = document.documentElement;
    const maxScrollTop = scrollHeight - innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.ceil((scrollFraction * 100) / 25);
    setIndex(frameIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", throttle(onScroll, 100));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Screen index={index} />
        <div className="mask">
          <div className="frame" />
        </div>
      </div>
    </div>
  );
}

export default App;
