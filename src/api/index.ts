import random from 'lodash/random';
import faker from 'faker';
import { Observable } from 'rxjs';

import { EPriority, IMessage } from '../lib/types';

const observable = new Observable<IMessage>((subscriber) => {
  const generate = () => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as EPriority;
    const id = faker.random.alphaNumeric(20);
    const nextInMS = random(500, 3000);
    subscriber.next({ message, priority, id });
    setTimeout(generate, nextInMS);
  };
  generate();
});

const subscribe = (callback: (message: IMessage) => void) => {
  return observable.subscribe({
    next: callback
  });
};

export default subscribe;
