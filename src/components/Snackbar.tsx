import { useState, useEffect, SyntheticEvent } from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { IMessage } from '../lib/types';

interface IProps {
  errors: IMessage[];
}

const Snackbar = ({ errors }: IProps) => {
  const [snackPack, setSnackPack] = useState<IMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<IMessage | null>(null);

  const handleClose = (_: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExited = () => {
    setCurrentMessage(null);
    setOpen(false);
  };

  useEffect(() => {
    if (errors.length && errors.length > snackPack.length) {
      if (currentMessage && open) {
        setOpen(false);
      }

      const newSnackPack = [errors[0], ...snackPack];

      setSnackPack(newSnackPack);
      setCurrentMessage(newSnackPack[0]);
      setOpen(true);
    } else {
      setSnackPack(errors);
    }

    return () => {
      setOpen(false);
      setCurrentMessage(null);
    };
  }, [errors]);

  const renderAlert = () => {
    if (currentMessage) {
      return (
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {currentMessage.message}
        </Alert>
      );
    }

    return;
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionProps={{
        onExit: handleExited
      }}
    >
      {renderAlert()}
    </MuiSnackbar>
  );
};

export default Snackbar;
