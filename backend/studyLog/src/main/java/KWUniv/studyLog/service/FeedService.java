package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.CommentDTO;
import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;


    /*
    FeedId로 Feed를 찾는 메서드
    - 존재하면 Feed를 return
    - 존재하지 않으면 null을 return
     */
    public Feed findFeedById(int feedId) {
        Optional<Feed> foundFeed = Optional.ofNullable(feedRepository.findFeedById(feedId));
        return foundFeed.isPresent() ? foundFeed.get() : null;
    }

    /*
    특정 피드를 등록하는 메서드
    - 만약 작성자가 존재하지 않을 시 400
    - 성공 시 200
     */
    @Transactional
    public ResponseEntity postAndSaveFeedAndSendResponse(FeedDTO feedDTO){
        Optional<User> user = Optional.ofNullable(userRepository.findUserById(feedDTO.getWriterId()));
        if(user.isEmpty()) return new ResponseEntity(HttpStatus.BAD_REQUEST);

        Feed feed = new Feed(user.get(), feedDTO.getFeedBody(), feedDTO.getPhoto());
        feedRepository.save(feed);
        return new ResponseEntity(HttpStatus.OK);
    }

    /*
    특정 피드에 Comment를 작성
    - 만약 작성자나 피드가 없으면 400
    - 성공 시 200
     */
    @Transactional
    public ResponseEntity writeCommentSendResponse(CommentDTO commentDTO) {
        User user = userRepository.findUserById(commentDTO.getUserId());
        Feed feed = feedRepository.findFeedById(commentDTO.getFeedId());

        if(user == null || feed == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        Comment comment = new Comment(user, feed, commentDTO.getCommentBody());
        commentRepository.save(comment);
        return new ResponseEntity(HttpStatus.OK);
    }


    public List<Feed> findFeedsByUserId(String userId){
        return feedRepository.findFeedsByWriterId(userId);
    }

    /*
    프로필 조회 요청이 왔을 때, User와 User가 작성한 Feed 반환
    - 유저가 없을 시, 400 반환
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> findUserAndFeedAndSendResponse(String userId) {
        User foundUser = userRepository.findUserById(userId);
        List<Feed> foundFeeds = findFeedsByUserId(userId);
        if(foundUser == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("user",foundUser);
        response.put("feeds", foundFeeds);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
    피드에 좋아요 누르기
    - 해당 피드를 찾아 좋아요 + 1 한 후, 응답으로 feedId, 좋아요 수 반환
     */
    @Transactional
    public ResponseEntity likeFeedAndSendResponse(Integer feedId) {
        Feed foundFeed = findFeedById(feedId);
        if(foundFeed == null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        foundFeed.plusFeedLikes();
        Map<String, Object> response = new HashMap<>();
        response.put("feedId", foundFeed.getFeedId());
        response.put("likes", foundFeed.getLikes());
        return new ResponseEntity(response, HttpStatus.OK);
    }

//    public Page<Feed> findFeedsByUserId(String userId, Pageable pageable) {
//
//    }
}
