package KWUniv.studyLog.service;

import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    /*
    FeedId로 Feed를 찾는 메서드
    - 존재하면 Feed를 return
    - 존재하지 않으면 null을 return
     */
    public Feed findFeedById(int feedId) {
        Optional<Feed> foundFeed = Optional.ofNullable(feedRepository.findFeedById(feedId));
        return foundFeed.isPresent() ? foundFeed.get() : null;
    }

//    public Page<Feed> findFeedsByUserId(String userId, Pageable pageable) {
//
//    }
}
