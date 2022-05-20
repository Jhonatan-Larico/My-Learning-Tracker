import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // validate on every keystroke
  const nameInputChangeHandler = (e) => {
    // on very keystroke it obtained the value
    //on every keystroke, this is fired, the enteredName state is updated
    setEnteredName(e.target.value);

    //validation
    // here we shouldn't use the enteredName state but instead "e.target.value", because we do update the entered name state with "setEnteredName(e.target.value)" and such state updates are then scheduled by react they are no processed immediately  so here don't have that latest state yet 
    if (e.target.value.trim() !== "") {
      setEnteredNameIsValid(true);
    }
  };

  //validate when a input is losing focus
  const nameInputBlurHandler = () => {
    console.log("blur");
    // if out input loses focus, it definitely was touched
    setEnteredNameTouched(true);

    //validation
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
    }
  };

  //validate when form is submitted
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);

    console.log(enteredName);
    // only when the form is submitted it obtained the value
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    //nameInputRef.current.value = "" =>NOT IDEAL,DON'T MANIPULATE THE DOM
    setEnteredName("");
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
