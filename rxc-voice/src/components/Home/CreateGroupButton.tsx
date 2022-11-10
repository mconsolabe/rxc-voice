import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CreateGroupButton() {
  return (
    <Stack spacing={2} direction="column">
      <Button variant="contained"
        onClick={() => {
          //alert('Group form');
          window.location.href="/create-group";
        }}
        style={{
          color: "yellow",
          backgroundColor: "black",
          fontFamily: "suisse_intlbook_italic",
        }}
      >
        Create Group
      </Button>
    </Stack>
  );
}

export {};