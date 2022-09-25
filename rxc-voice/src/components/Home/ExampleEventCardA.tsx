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

export default function ExampleEventCardA() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
      sx={{ maxWidth: 345 }}
      style={{
        color: "yellow",
        backgroundColor: "black",
        fontFamily: "suisse_intlbook_italic",
      }}
    >
      <CardHeader
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
        title="Company X Poll #Y"
        subheader={
            <Typography sx={{
                color: "yellow",
                backgroundColor: "black",
                fontFamily: "suisse_intlbook_italic",
            }}
            >
                8/20/2022
            </Typography>
        }
      />
      <CardContent>
        <Typography 
          variant="body2" 
          color="text.secondary"
          style={{
            color: "yellow",
            fontFamily: "suisse_intlbook_italic",
          }}
        >
          Voting on topic Z.
        </Typography>
        <IconButton 
          aria-label="add to favorites"
          style={{
            color: "yellow"
          }}
        >
          <BarChartIcon />
        </IconButton>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          aria-label="add to favorites"
          style={{
            color: "yellow"
          }}
        >
          <BarChartIcon />
        </IconButton>
        {/*
        <IconButton 
          aria-label="share"
          style={{
            color: "yellow"
          }}
        >
          <BarChartIcon />
        </IconButton>
        */}
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph
            style={{
              color: "yellow",
              fontFamily: "suisse_intlbook_italic",
            }}
          >
            In this poll, members will be voting on topic Z in order to finalize decisionmaking.
          </Typography>
          <Typography paragraph
            style={{
              color: "yellow",
              fontFamily: "suisse_intlbook_italic",
            }}
          >
            Everyone will receive W tokens to be used throughout poll #Y.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}