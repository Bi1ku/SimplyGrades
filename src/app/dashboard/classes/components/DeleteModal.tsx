import a from '@/src/axios';
import Modal from '@/src/components/Modal';
import { notify } from '@/src/utils';
import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';

export default function DeleteModal({
  open,
  setOpen,
  refetch,
  classId,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
  classId: string;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteClass = async () => {
    setLoading(true);
    const { data: response } = await a.delete(`/classes/${classId}`);
    if (!response) return setLoading(false);
    notify('Successfully deleted class!');
    refetch();
    setLoading(false);
  };

  const handleClose = () => !loading && setOpen(false);
  return (
    <Modal
      title='Delete this class?'
      open={open}
      handleClose={handleClose}
      buttons={[
        { title: 'Cancel', onClick: () => handleClose },
        {
          title: 'Delete',
          onClick: async () => {
            await handleDeleteClass();
            handleClose();
          },
        },
      ]}
      loading={loading}
    >
      <DialogContentText>
        Deleting this class will completely remove it from our database. All
        currently enrolled students, grades, etc. will be lost.
      </DialogContentText>
    </Modal>
  );
}
