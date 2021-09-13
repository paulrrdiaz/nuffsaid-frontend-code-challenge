import { makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { useMessages } from '../context/messages';
import { IMessage, EPriority } from '../lib/types';

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  error: {
    background: palette.error.main
  },
  warning: {
    background: palette.warning.main
  },
  info: {
    background: palette.info.main
  },
  item: {
    '& + &': {
      marginTop: spacing(2)
    },
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
}));

const MessagesItem = (m: IMessage) => {
  const { message, priority } = m;
  const classes = useStyles();
  const { removeMessage } = useMessages();
  const type = EPriority[priority];

  return (
    <ListItem
      data-testid="MessagesItem"
      className={clsx(classes[type as keyof typeof EPriority], classes.item)}
    >
      {message}

      <Link
        component="button"
        variant="caption"
        color="inherit"
        onClick={() => removeMessage(m)}
      >
        Clear
      </Link>
    </ListItem>
  );
};

export default MessagesItem;
