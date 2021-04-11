import PersonalFooter from "@bit/lokinder1.footers.personal-footer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import CSVFileUpload from "./components/Post/CSVFileUpload";
import TxtFileUpload from "./components/Post/TxtFileUpload";
import XlsxFileUpload from "./components/Post/XlsxFileUpload";
import ShowResult from "./components/ShowResult";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    "overflow-x": "hidden",
  },
  main: {
    minHeight: "calc(100vh - 120px)",
  },

  uploadFile: {
    padding: " 0px 50px !important",
  },

  button: {
    margin: " 8px !important",
  },
}));

export default function Home() {
  const classes = useStyles();
  // State to store uploaded file
  const [fileData, setFileData] = useState("");

  const handleCallback = (result) => {
    setFileData(result.data);
  };

  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.main}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Link>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Grid container spacing={2}>
                <Grid className={classes.uploadFile} item xs={12} sm={6}>
                  <Paper elevation={3}>
                    <TxtFileUpload parentCallback={handleCallback} />
                  </Paper>
                  <Paper elevation={3}>
                    <CSVFileUpload parentCallback={handleCallback} />
                  </Paper>
                  <Paper elevation={3}>
                    <XlsxFileUpload parentCallback={handleCallback} />
                  </Paper>
                </Grid>

                <Grid className={classes.uploadFile} item xs={12} sm={6}>
                  <Paper elevation={3}>
                    <ShowResult resultJson={fileData} />
                  </Paper>
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </div>
        <PersonalFooter />
      </div>
    </Router>
  );
}
