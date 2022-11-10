import React, { useContext, useEffect } from "react";
import { ActionContext, StateContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import { Process } from "../../models/Process";
import ProcessCard from "./components/ProcessCard";
import "./Home.scss";
import "./ClosesTodayTable.scss";
import CreateGroupButton from "./CreateGroupButton";
import CreateEventButton from "./CreateEventButton";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ExampleEventCardA from "./ExampleEventCardA";
import moment from "moment";
//import * as React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


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
      {/*<a href="#Results"><u>Click here to go the Results and Impact subsection</u></a><br></br><br></br>*/}
      <a href="#Active Events"><u>Click here to go the Active Events subsection</u></a><br></br><br></br>
      <a href="#Past Events"><u>Click here to go the Past Events subsection</u></a><br></br><br></br>
      <div>&nbsp;</div>
      <CreateGroupButton></CreateGroupButton>
      <div>&nbsp;</div>
      <CreateEventButton></CreateEventButton>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <ToggleButtonGroup
      //value={formats}
      //onChange={handleFormat}
      aria-label="text formatting"
      color="secondary"
      >
        <ToggleButton value="underlined" aria-label="underlined"
          onClick={() => {
            displayPastEvents()
          }}
        >
          <div>
            <KeyboardDoubleArrowLeftIcon style={{ color: "black" }}/>
            Past Events
          </div>
        </ToggleButton>
        <ToggleButton value="bold" aria-label="bold"
          onClick={() => {
            displayClosingEvents()
          }}
        >
          <div>
            <CalendarMonthIcon style={{ color: "black" }} />
            Events Closing Today
          </div>
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic"
          onClick={() => {
            displayActiveEvents()
          }}
        >
          <div>
            <KeyboardDoubleArrowRightIcon style={{ color: "black" }}/>
            Active Events
          </div>
        </ToggleButton>
    </ToggleButtonGroup>
    <div>&nbsp;</div>
    <div>&nbsp;</div>

    
      <h2 id="Closing Events">
        <u>Events Closing Today</u>
      
      {/* (moment({hours: 0}).diff(props.process.end_date, 'days') >= -1) ? true : false; */}
      {
      /*
      <table className="styled-table" id="html-data-table">
        <thead>
          <tr>
              <th>Event Title</th>
              <th>Time Until Closing</th>
          </tr>
        </thead>
        <tbody>
          <tr className="active-row">
              <td>props.process.title</td>
              <td>{moment(props.process.end_date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}</td>
          </tr>
        </tbody>
      </table>
      <script type="text/javascript" charset="utf-8">
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(function (response) {
                return response.json();
            }).then(function (apiJsonData) {
                console.log(apiJsonData);
            })
        function renderDataInTheTable(todos) {
            const mytable = document.getElementById("html-data-table");
            todos.forEach(todo => {
                let newRow = document.createElement("tr");
                Object.values(todo).forEach((value) => {
                    let cell = document.createElement("td");
                    cell.innerText = value;
                    newRow.appendChild(cell);
                })
                mytable.appendChild(newRow);
            });
        }
       </script>
      */
      }
      {activeProcesses?.length ? (
        <ul className="process-list">
            <table className="styled-table">
              <thead>
                <tr>
                    <th>Event Title</th>
                    <th>Time Until Closing</th>
                </tr>
              </thead>
              <tbody>
              {activeProcesses.map((process: Process) => (
                <tr className="active-row">
                    {((moment({hours: 0}).diff(process.end_date, 'days') >= -1) ? <td>{process.title}</td>  : false )}
                    {((moment({hours: 0}).diff(process.end_date, 'days') >= -1) ? <td>{"Closes " + moment(process.end_date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}</td>  : false )}
                </tr>
              ))}
              </tbody>
            </table>
        </ul>
      ) : null}
      </h2>
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

      
      {activeProcesses?.length || pastProcesses?.length ? (
        <div className="content">
          <h2 id = "Active Events">
            <u>Active Events</u>
          {activeProcesses?.length ? (
            <ul className="process-list">
              <Grid 
                container 
                rowSpacing={1} 
                columnSpacing={30}
                //spacing = {30} 
                className={classes.gridContainer} 
                alignItems="left"
                justifyContent="left"
                direction="row"
              >
              {activeProcesses.map((process: Process) => (
                <Grid item xs={2.4} sm={2.4} md={2.4} key={process.id}>
                  <ProcessCard process={process} active={true} />
                </Grid>
              ))}
              </Grid>
            </ul>
          ) : null}
          </h2>
          <h2 id = "Past Events">
            <u>Past Events</u>
          {pastProcesses?.length ? (
            <ul className="process-list">
              <Grid 
                container 
                rowSpacing={1} 
                columnSpacing={30}
                //spacing = {30} 
                className={classes.gridContainer} 
                alignItems="left"
                justifyContent="left"
                direction="row"
              >
              {pastProcesses.map((process: Process) => (
                <Grid item xs={2.4} sm={2.4} md={2.4} key={process.id}>
                  <ProcessCard key={process.id} process={process} active={false} />
                </Grid>
              ))}
              </Grid>
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
function displayPastEvents() {
  var x = document.getElementById("Past Events");
  if(x != null ) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } 
    else {
      x.style.display = "none";
    }
  }
}

function displayClosingEvents() {
  var x = document.getElementById("Closing Events");
  if(x != null ) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } 
    else {
      x.style.display = "none";
    }
  }
}

function displayActiveEvents() {
  var x = document.getElementById("Active Events");
  if(x != null ) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } 
    else {
      x.style.display = "none";
    }
  }
}

