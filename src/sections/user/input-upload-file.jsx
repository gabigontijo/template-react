import * as React from 'react';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  return (
    <List sx={{padding: 0}}>
      <ListItem alignItems="flex-start">
        <ListItemText primary="Documentos" />
      {/* </ListItem>
      <ListItem> */}
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Carregar arquivos
          <VisuallyHiddenInput type="file" />
        </Button>
      </ListItem>
    </List>
  );
}
