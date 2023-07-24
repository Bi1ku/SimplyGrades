import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function Modal({
  open,
  handleClose,
  title,
  children,
  buttons,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  buttons: { title: string; onClick: () => void; props?: any }[];
}) {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ boxShadow: 'none' }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {buttons.map((button) => (
          <Button {...button.props} onClick={button.onClick}>
            {button.title}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
