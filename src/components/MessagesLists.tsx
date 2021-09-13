import { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useMessages } from '../context/messages';
import MessagesList from './MessagesList';
import Snackbar from './Snackbar';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  buttons: {
    '& > *': {
      margin: spacing(1)
    }
  }
}));

const MessagesLists = () => {
  const {
    subscribeMessages,
    unsubscribeMessages,
    pauseMessages,
    clearMessages,
    isPaused,
    total,
    messages
  } = useMessages();
  const classes = useStyles();

  useEffect(() => {
    if (isPaused) {
      unsubscribeMessages();
    } else {
      subscribeMessages();
    }

    return () => unsubscribeMessages();
  }, [isPaused]);

  return (
    <Container>
      <Box py={4} textAlign="center" className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => pauseMessages(!isPaused)}
        >
          {isPaused ? 'resume' : 'pause'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => clearMessages()}
          disabled={!total}
        >
          Clear all messages
        </Button>

        <Typography variant="h6">
          Total: <span data-testid="total">{total}</span>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <MessagesList title="Error Type 1" messages={messages.error} />
        <MessagesList title="Warning Type 2" messages={messages.warning} />
        <MessagesList title="Info Type 3" messages={messages.info} />
      </Grid>

      <Snackbar errors={messages.error} />
    </Container>
  );
};

export default MessagesLists;
