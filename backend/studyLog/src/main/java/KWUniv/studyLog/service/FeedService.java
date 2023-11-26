package KWUniv.studyLog.service;

import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.repository.FeedRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class FeedService {

    @Autowired
    FeedRepository feedRepository;


    /*
    FeedId로 Feed를 찾는 메서드
    - 존재하면 Feed를 return
    - 존재하지 않으면 null을 return
     */
    public Feed findFeedById(int feedId) {
        Optional<Feed> foundFeed = Optional.ofNullable(feedRepository.findFeedById(feedId));
        return foundFeed.isPresent() ? foundFeed.get() : null;
    }
}
