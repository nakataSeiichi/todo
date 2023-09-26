import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type TModal = {
  // eslint-disable-next-line react/require-default-props
  children?: string | JSX.Element | JSX.Element[] | undefined;
  open: boolean;
  // eslint-disable-next-line react/require-default-props
  dialogIcon?: JSX.Element;
  dialogTitle: string;
  dialogContentText: string;
  handleSubmit: () => void;
  handleClose: () => void;
};

export default function ModalBase({
  children,
  open,
  dialogIcon,
  dialogTitle,
  dialogContentText,
  handleSubmit,
  handleClose,
}: TModal) {
  const handleConfirm = () => {
    handleSubmit();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          {typeof dialogIcon !== 'undefined' && (
            <Box sx={{ lineHeight: '10px', marginRight: '0.5rem' }}>
              {dialogIcon}
            </Box>
          )}
          <Box flexGrow={1}>{dialogTitle}</Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
