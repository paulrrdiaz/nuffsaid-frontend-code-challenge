import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { IMessage } from '../lib/types';
import MessagesItem from './MessagesItem';

interface IProps {
  messages: IMessage[];
  title: string;
}

const MessagesList = ({ messages, title }: IProps) => {
  return (
    <Grid data-testid="MessagesList" item xs={4}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="caption">Count: {messages.length}</Typography>
      <List>
        {messages.map((m) => (
          <MessagesItem {...m} key={m.message} />
        ))}
      </List>
    </Grid>
  );
};

export default memo(MessagesList);
