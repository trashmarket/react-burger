import FeedMain from '../components/feed-main/feed-main';
import { IFeedMain } from '../services/types-components';
import { FC } from 'react';

const FeedPage: FC<IFeedMain> = (props) => {
  return <FeedMain {...props}/>
}

export { FeedPage }