import random from 'lodash/random';
import faker from 'faker';
import { Observable } from 'rxjs';

import { EPriority,  IMessage} from '../lib/types'



const observable = new Observable<IMessage>(subscriber => {
  const generate = () => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as EPriority;
    const nextInMS = random(500, 3000);
    subscriber.next({ message, priority });
    setTimeout(generate, nextInMS);
  };
  generate();
});

const subscribe = (callback: (message: IMessage) => void) => {
  const subscription = observable.subscribe({
    next: callback,
  });
  return () => subscription.unsubscribe();
};

export default subscribe;
