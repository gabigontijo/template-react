import PropTypes from 'prop-types';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
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

export default function InputFileUpload({ setState, uploadedDocuments }) {
  const handleFileChange = ({ target }) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { files } = target;
    console.log('Files:', files);
    console.log('uploadedDocuments:', uploadedDocuments);
    setState((prevState) => ({
      ...prevState,
      documents: Array.isArray(prevState.documents)
        ? [...prevState.documents, ...files]
        : [...files],
    }));
  };

  const handleRemoveFile = (index) => {
    setState((prevState) => {
      const updatedDocuments = [...prevState.documents];
      updatedDocuments.splice(index, 1);
      return {
        ...prevState,
        documents: updatedDocuments,
      };
    });
  };

  return (
    <List sx={{ padding: 0 }}>
      <ListItem alignItems="flex-start">
        <ListItemText primary="Documentos" />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Carregar arquivos
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
      </ListItem>
      <ListItem>
        <ul style={{ listStyle: 'initial' }}>
          {Array.isArray(uploadedDocuments) &&
            uploadedDocuments.map((file, index) => (
              <li key={index}>
                {file.name}
                <Button
                  size="small"
                  color="inherit"
                  onClick={() => handleRemoveFile(index)}
                  whiteSpace='nowrap'
                >
                   <DeleteIcon  sx={{width: '20px'}} />
                </Button>
              </li>
            ))}
        </ul>
      </ListItem>
    </List>
  );
}

InputFileUpload.propTypes = {
  setState: PropTypes.func,
  uploadedDocuments: PropTypes.any,
};
