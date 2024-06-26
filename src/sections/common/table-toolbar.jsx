import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import DialogDelete from './dialog-delete';

// ----------------------------------------------------------------------

export default function TableToolbar({ numSelected, filterName, onFilterName, handleDelete, selected, openDialog, setOpenDialog, placeholder, message }) {

  const handleDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDialog}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
       <DialogDelete open={openDialog} setOpen={setOpenDialog} handleDelete={handleDelete} name={selected} message={message} />
    </Toolbar>
  );
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  handleDelete: PropTypes.func,
  selected: PropTypes.any,
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  placeholder: PropTypes.string,
  message: PropTypes.string,
};
