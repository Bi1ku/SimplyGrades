import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Exist from './Exist';
import Typography from '@mui/material/Typography';

export default function Modal({
  open,
  handleClose,
  title,
  children,
  buttons,
  subtitle,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  buttons: { title: string; onClick: () => void }[];
  subtitle?: string;
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Exist data={!subtitle} placeholder={<DialogTitle>{title}</DialogTitle>}>
        <DialogTitle sx={{ pb: 0 }}>
          {title}
          <Typography variant='body2'>{subtitle}</Typography>
        </DialogTitle>
      </Exist>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {buttons.map((button) => (
          <Button onClick={button.onClick}>{button.title}</Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
