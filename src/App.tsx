import "./App.css";
import React from 'react';
import Dragger from "./components/input/Dragger";
import ChattingSpeedChart from "./components/result/ChattingSpeedChart";
import { ChattingSpeed } from "./util";

function App() {
  return (
    <div className="App">
      <Dragger />
      <ChattingSpeedChart chattingSpeed={[] as ChattingSpeed} />
    </div>
  );
}

export default App;
