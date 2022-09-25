import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CreateEventButton() {
  return (
    <Stack spacing={2} direction="column">
      <Button variant="contained" 
        onClick={() => {
          //alert('Event created');
          window.location.href="/create-event";
        }}
        style={{
          color: "yellow",
          backgroundColor: "black",
          fontFamily: "suisse_intlbook_italic",
        }}
      >
        Create Event
      </Button>
    </Stack>
  );
}

export {};