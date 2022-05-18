import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  // add logic which we want to reuse
  //when this gets called , all that code will execute
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);//dependency, so this effect will rerun whenever this dependency changes  

  return counter;
};

export default useCounter;
