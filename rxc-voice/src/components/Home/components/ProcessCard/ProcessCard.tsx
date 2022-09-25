import { Link } from "react-router-dom";
import slugify from "react-slugify";
import moment from "moment";
import { Stage } from "../../../../models/Stage";
import { getStageByPosition } from "../../../../utils";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

import "./ProcessCard.scss";
import ExampleEventCardA from "../../ExampleEventCardA";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProcessCard(props: any) {
  const currentStage: Stage | undefined = getStageByPosition(+props.process.curr_stage, props.process);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <li className="process-card" key={props.process.id}>
      <Card 
      sx={{ maxWidth: 345 }}
      style={{
        color: "yellow",
        backgroundColor: "black",
        fontFamily: "suisse_intlbook_italic",
      }}
      >
        <CardHeader
          className="title"
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
          }}
          title={props.process.title}
          subheader={
              <Typography sx={{
                  color: "yellow",
                  backgroundColor: "black",
                  fontFamily: "suisse_intlbook_italic",
              }}
              >
            
              </Typography>
          }
        />
        <p>{
        <CardContent>
          <Typography 
            variant="body2" 
            color="text.secondary"
            style={{
              color: "yellow",
              fontFamily: "suisse_intlbook_italic",
            }}
          >
            
          </Typography>
          <IconButton 
            aria-label="add to favorites"
            style={{
              color: "yellow"
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton 
            aria-label="add to favorites"
            style={{
              color: "yellow"
            }}
          >
            <BarChartIcon />
          </IconButton>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            color: "yellow"
          }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <IconButton 
            aria-label="add to favorites"
            style={{
              color: "yellow"
            }}
            onClick={() => {
              //alert('Event created');
              window.location.href="/manage-events/"+ props.process.id + "/" + slugify(props.process.title);
            }}
          >
            <HowToVoteIcon />
          </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph
            style={{
              color: "yellow",
              fontFamily: "suisse_intlbook_italic",
            }}
          >
            {props.process.description}
          </Typography>
        </CardContent>
        </Collapse>
        </CardContent>
        
        }
        </p>
        <p className="time-remaining">
          {(props.active ? "Closes " : "Closed ") + moment(props.process.end_date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}
        </p>
      </Card>
    </li>
  );
}

export default ProcessCard;
