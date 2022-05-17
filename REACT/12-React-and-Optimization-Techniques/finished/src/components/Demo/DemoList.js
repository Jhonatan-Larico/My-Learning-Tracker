import React, { useMemo } from "react";

import classes from "./DemoList.module.css";

const DemoList = (props) => {
  const { items } = props;
 //sort is a metod that have much computational cost  so he have use useMemo to memoise
  const sortedList = useMemo(() => {
    console.log("Items sorted");
    // return what you what to store, in this case sorted array
    return items.sort((a, b) => a - b);
  }, [items]); // array of dependencies, to ensure that this stored value is updated whenever one of the values you're using in there changes 
  console.log("DemoList RUNNING");

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
