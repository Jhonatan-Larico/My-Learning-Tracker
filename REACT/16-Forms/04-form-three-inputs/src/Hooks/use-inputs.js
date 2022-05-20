import { useState } from "react";

const useInputs = (validateValue) => {

  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);


  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched;

  // valitation on every keystroke
  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("")
    setIsTouched(false)
  };

  return {
    value:enteredValue,
    isValid:valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,    
  };
};

export default useInputs;
