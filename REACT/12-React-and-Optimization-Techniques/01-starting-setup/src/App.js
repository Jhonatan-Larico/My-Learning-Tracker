import Button from "./components/UI/Button/Button";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log('APP RUNNING')

  const toogleParagraphHandler = () => {
    setShowParagraph(prevShowParagraph=> !prevShowParagraph    );
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <Button onClick={toogleParagraphHandler}> Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
