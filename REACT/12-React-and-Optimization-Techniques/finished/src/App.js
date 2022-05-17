/*import Button from "./components/UI/Button/Button";
import React, { useState, useCallback } from "react";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput"; */
/*
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING");

  const toogleParagraphHandler = useCallback(() => {
    //useCallback return that stored function , and when the app function reruns useCallback will look for  that stored function and reuse that same function object
    // here we have a clousure  
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]); //this dependencies are the same as they are for useEffect

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };
  return (
    <div className="app">
      <h1>Hi there!</h1>
      
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <Button onClick={toogleParagraphHandler}> Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
*/


import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

function App() {
  const [listTitle, setListTitle] = useState('My List');
  //we have yseCallback to store function objects  and only rebuild then when some input changed
  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  //you will use useMemo far less often than you use useCllaback  because memorizing functions is much more useful and you need that more often than memorizing data
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;


