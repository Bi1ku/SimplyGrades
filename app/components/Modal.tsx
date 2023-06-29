import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function Modal({
  open,
  handleClose,
  handleSubmit,
  title,
  children,
}: {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ boxShadow: 'none' }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSubmit();
            handleClose();
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
