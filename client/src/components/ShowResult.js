import React from "react";
import ReactJson from "react-json-view";

const ShowResult = React.memo((props) => {
  return (
    props.resultJson && (
      <ReactJson
        src={props.resultJson}
        collapsed={1}
        displayObjectSize={true}
        theme="shapeshifter"
        collapseStringsAfterLength={100}
        groupArraysAfterLength={5}
      />
    )
  );
});

export default ShowResult;
