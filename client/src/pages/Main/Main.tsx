// import FeedContainer from './FeedContainer.component';
import CreateFeedButton from './CreatFeedButton/CreateFeedButton';
import FeedContainer from './FeedContainer.component';

// TODO: URL 정하고, response type 정의하기
export default function Main() {
  return (
    <div>
      <FeedContainer />
      <CreateFeedButton />
    </div>
  );
}
