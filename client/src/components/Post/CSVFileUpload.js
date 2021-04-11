import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(() => ({
  root: {
    margin: "20px",
    padding: "10px",
  },
  main: {
    padding: " 0px 50px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  fileInfo: {
    padding: "10px 50px !important",
  },
}));

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export default function CSVFileUpload(props) {
  const classes = useStyles();

  // State to store uploaded file
  const [file, setFile] = useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    const data = new FormData();
    data.append("csvFile", event.target.files[0]);

    axios
      .post("http://localhost:4000/upload/csv", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res);
        props.parentCallback(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // Add code here to upload file to server
    // ...
  }

  return (
    <div className={classes.root}>
      <h2>Csv File</h2>
      <div className={classes.main}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          <input type="file" onChange={handleUpload} />
        </Button>
      </div>
      <div className={classes.fileInfo}>
        <p>Filename: {file.name}</p>
        <p>File type: {file.type}</p>
        <p>File size: {file.size} bytes</p>
      </div>
    </div>
  );
}
