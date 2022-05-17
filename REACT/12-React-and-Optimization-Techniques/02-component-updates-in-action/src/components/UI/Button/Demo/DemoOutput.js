import React from "react";
import MyParagraph from "./MyParagraph";
//i will render this conditionally  base on some data i get through props
const DemoOutput = (props) => {
  console.log("DemoOutputRUNNIG")
  return <MyParagraph> {props.show ? 'This is new!': ""} </MyParagraph>;
};

export default DemoOutput;
