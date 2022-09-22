import React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import moment from "moment";
import { Stage } from "../../../../models/Stage";
import { getStageByPosition } from "../../../../utils";


import "./ProcessCard.scss";

function ProcessCard(props: any) {
  const currentStage: Stage | undefined = getStageByPosition(+props.process.curr_stage, props.process);

  return (
    <li className="process-card" key={props.process.id}>
      <Link
      to={currentStage ? (
        `/${props.process.id}/${slugify(props.process.title)}/${currentStage.position}/${slugify(currentStage.title)}`
      ) : (
        `/${props.process.id}/${slugify(props.process.title)}}`
      )}
      >
        <h2 className="title">
          
         
         {props.process.title}
          
          
          
          </h2>
        <p>{props.process.description}</p>
        <p className="time-remaining">
          {(props.active ? "Closes " : "Closed ") + moment(props.process.end_date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}
        </p>
      </Link>
    </li>
  );
}

export default ProcessCard;
