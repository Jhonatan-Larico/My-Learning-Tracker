import React, { useState, useEffect, useReducer, useContext,useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../Input/Input";
//this function is outside of the component because we won't need any data  that's generated  inside of the component function
const emailReducer = (state, action) => {
  // if I received a user input action
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  // state is the last state snapshot
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  // return default state
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    //inisital state
    { value: "", isValid: null }
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    //inisital state
    { value: "", isValid: null }
  );

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  //(emailIsValid, passwordIsValid ) this is an alias assigment, not the value assigment
  //I'm pulling out the  isValid state here , whenever just the value changes and the validity did not change this effect will not rerun
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(
    () => {
      const identifier = setTimeout(() => {
        console.log("Checking form validity!");
        setFormIsValid(
          emailIsValid && passwordIsValid
          //emailState.isValid && passwordState.isValid
        );
      }, 1000);
      // The cleanup function runs  before every new side effect function execution and before the component is removed and it doesn't run before the first side effect function execution but thereafiter it will run  before every next side effect function execution
      return () => {
        console.log("CLEANUP");
        clearTimeout(identifier);
      };
    },
    //After every login component function execution , it will rerun this useEffect function  but only if either setFormIsValid or enteredEmail or enteredPassword  changed in the last component rerender cycle if neither of the three changed, this effect function will not rerun, you can also omit setFormIsValid because those state updating functions by default  are insured by React to never change, so these functions  will always be the same across rereder cycles, so you can omit them
    [emailIsValid, passwordIsValid]
    //[emailState, passwordState]
  );
  // -this actually is now an okay way of updating a state based on other state because wth use effect, we're guaranteed that this will run for every state update React performs, useEffect only runs after state updates

  const emailChangeHandler = (event) => {
    // dispatch an action, when we want to update  the value
    // ( ) can be a string,number but often will be an object,and we also can add an extra payload, since we wanna save what the user entered.So now that's our action it's this object
    //So this now will trigger this function "emailReducer"
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    /*    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    ) */
  };
  const validateEmailHandler = () => {
    //simple action without a value
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    /*    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6

    ); */
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid) {
      // "activate()" is a function we have in our Input component
      emailInputRef.current.focus()
    }else{
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
