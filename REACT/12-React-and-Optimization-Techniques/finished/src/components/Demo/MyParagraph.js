import React from "react";


const MyParagraph = (props) => {
  console.log("MyParagraph RUNNIG")
  return <p> {props.children} </p>;
};

export default MyParagraph;
