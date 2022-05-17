import Button from "./components/UI/Button/Button";
import React, { useState } from "react";
import "./App.css";
import DemoOutput from "./components/UI/Button/Demo/DemoOutput";

/**
 - In this example 
 - If  <DemoOutput show={false}/> what would you expect as a result?
  
 -if all component functions are re-executed is bad? 

*/
function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toogleParagraphHandler = () => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  };

  return (
     /*all those js elements here  in the end are like function calls to the respect of component functions, that's why those child components are also re-executed  and re-evaluated just because the parent component changed */
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toogleParagraphHandler}> Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
