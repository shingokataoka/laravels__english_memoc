import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';
import { usePage } from '@inertiajs/react';




const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 0,
  p: 0,
};





export default function UpdatedEmailModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

    const session = usePage().props.session
    const flashStatus = session.status
    const flashMessage = session.message



    if (!flashMessage) return

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Alert variant="filled" severity={ flashStatus }
                style={{ cursor:'pointer', }}
                onClick={ handleClose }
            >
                { flashMessage }
            </Alert>
         </Box>
        </Fade>
      </Modal>
    </div>
  );
}
