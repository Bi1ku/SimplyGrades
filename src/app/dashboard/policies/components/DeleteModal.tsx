import a from '@/src/axios';
import Modal from '@/src/components/Modal';
import { notify } from '@/src/utils';
import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';

export default function DeleteModal({
  open,
  setOpen,
  refetch,
  policyId,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
  policyId: string;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDeletePolicy = async () => {
    setLoading(true);
    const { data: response } = await a.delete(`/policies/${policyId}`);
    if (!response) return setLoading(false);
    notify('Successfully deleted policy!');
    refetch();
    setLoading(false);
  };

  const handleClose = async () => !loading && setOpen(false);
  return (
    <Modal
      title='Delete this policy?'
      open={open}
      handleClose={handleClose}
      buttons={[
        { title: 'Cancel', onClick: handleClose },
        {
          title: 'Delete',
          onClick: async () => {
            await handleDeletePolicy();
            handleClose();
          },
        },
      ]}
      loading={loading}
    >
      <DialogContentText>
        Deleting this class will completely remove it from our database. All
        future classes will not be able to use this policy again.
      </DialogContentText>
    </Modal>
  );
}
