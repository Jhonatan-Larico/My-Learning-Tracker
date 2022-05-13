import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

//input still is a React component that is capable of being bound to a "ref", with that  Input is able to take a ref prop  and it will expose a ref and it is controllable or  usable with "ref"
const Input = React.forwardRef((props,ref) => {
  const inputRef = useRef();
    // "ref" should be set from outside
  const activate = (props,ref) =>{
      inputRef.current.focus()
  }

    useImperativeHandle(ref,()=>{
        return {
            //this object will contain all the data  you will be able to use from outside, "active" refers to active function and  "focus" is the externally name
            focus:activate
        }
    });


  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
