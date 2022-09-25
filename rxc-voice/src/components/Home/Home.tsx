import React, { useContext, useEffect } from "react";
import { ActionContext, StateContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import { Process } from "../../models/Process";
import ProcessCard from "./components/ProcessCard";
import "./Home.scss";
import CreateGroupButton from "./CreateGroupButton";
import CreateEventButton from "./CreateEventButton";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ExampleEventCardA from "./ExampleEventCardA";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
})

function Home() {
  const { setColor, fetchProcesses } = useContext(ActionContext);
  const { processes, activeProcesses, pastProcesses } = useContext(StateContext);
  const classes = useStyles();
  useEffect(() => {
    setColor(BgColor.Yellow);

    if (processes === undefined) {
      fetchProcesses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <h1 className="title">Welcome to RxC Voice</h1>
      <p>RadicalxChange's platform for collective decision making!<br></br>
      Click on a decision below to participate or see results.</p><br></br>
      {/*<a href="#Results"><u>Click here to go the Results and Impact subsection</u></a><br></br><br></br>*/};
      <a href="#Active Events"><u>Click here to go the Active Events subsection</u></a><br></br><br></br>
      <a href="#Past Events"><u>Click here to go the Past Events subsection</u></a><br></br><br></br>
      <div>&nbsp;</div>
      <CreateGroupButton></CreateGroupButton>
      <div>&nbsp;</div>
      <CreateEventButton></CreateEventButton>
      {/*
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      */}
      {/*
      <h2 id = "Results">
        <u>Results and Impact</u>
      </h2>
      */}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <Grid 
        container 
        spacing = {3} 
        className={classes.gridContainer} 
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={12} sm={6} md={4}>
          
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        
        </Grid>
      </Grid>      
      
      {activeProcesses?.length || pastProcesses?.length ? (
        <div className="content">
          <h2 id = "Active Events">
            <u>Active Events</u>
          {activeProcesses?.length ? (
            <ul className="process-list">
              {activeProcesses.map((process: Process) => (
                  <ProcessCard process={process} active={true} />
              ))}
            </ul>
          ) : null}
          </h2>
          <h2 id = "Past Events">
            <u>Past Events</u>
          {pastProcesses?.length ? (
            <ul className="process-list">
              {pastProcesses.map((process: Process) => (
                <ProcessCard key={process.id} process={process} active={false} />
              ))}
            </ul>
          ) : null}
          </h2>
        </div>
        ) : (
          <p className="no-events">When you participate in an event, it will appear here!</p>
        )}
    </div>
  );
}

export default Home;
