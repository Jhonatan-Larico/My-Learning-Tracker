import Button from "./components/UI/Button/Button";
import React, { useState } from "react";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

/**

*/
function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  //this function is re-created, this is now a brand new function for every render or every execution cycle of the app function
  //this is not the same function all the time, this is a brand new function  for every time the App function is being executed 
  const toogleParagraphHandler = () => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  };

  return (
     
    <div className="app">
      <h1>Hi there!</h1>
      {/**a new false value is created for every re-execution of APP function
      if a new false is created and a new function is created, shouldn't both components be re-evaluated?
      React.memo  compares 
        props.show === props.previous.show, for primite values this will work
        false === false, true
        "hi" === "hi", true
        but
        [1,2,3] === [1,2,3] , false
        so, Button compares 
        props.onClick === props.previous.onClick, false
        we have two function objects even if the have the same content, are never equal in Js when compared like this  and therefore, React.memo finds out that the value changed  jus beccause of how Js works
       */}
      <DemoOutput show={false} />
      <Button onClick={toogleParagraphHandler}> Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
