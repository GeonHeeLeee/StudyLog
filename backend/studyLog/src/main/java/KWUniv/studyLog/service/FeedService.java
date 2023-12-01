package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.CommentDTO;
import KWUniv.studyLog.DTO.FeedsDTO;
import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.FeedNotFoundException;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;

    /*
    FeedId로 Feed를 찾는 메서드
    - 존재하면 Feed를 return
    - 존재하지 않으면 null을 return
     */
    public Feed findFeedById(int feedId) {
        return feedRepository.findById(feedId)
                .orElseThrow(() -> new FeedNotFoundException("Feed not found with id : " + feedId));
    }

    public List<Feed> findFeedsByUserId(String userId) {
        return feedRepository.findByUser_UserId(userId);
    }


    /*
    특정 피드를 등록하는 메서드
    - 만약 작성자가 존재하지 않을 시 400
    - 성공 시 200
     */

    public boolean postAndSaveFeed(FeedsDTO feedDTO) {
        User user = userService.findUserById(feedDTO.getWriterId());

        Feed feed = new Feed(user, feedDTO.getFeedBody(), feedDTO.getPhoto());
        feedRepository.save(feed);
        return true;
    }

    /*
    특정 피드에 Comment를 작성
    - 만약 작성자나 피드가 없으면 400
    - 성공 시 200
     */

    public void writeComment(CommentDTO commentDTO) {
        User user = userService.findUserById(commentDTO.getUserId());
        Feed feed = findFeedById(commentDTO.getFeedId());
        Comment comment = new Comment(user, feed, commentDTO.getCommentBody());
        commentRepository.save(comment);
    }


    /*
    프로필 조회 요청이 왔을 때, User와 User가 작성한 Feed 반환
    - 유저가 없을 시, 400 반환
     */

    public Map<String, Object> findUserAndFeed(String userId) {
        User foundUser = userService.findUserById(userId);
        List<Feed> foundFeeds = findFeedsByUserId(userId);

        //무한참조 문제가 발생해 DTO로 응답
        List<FeedsDTO> feedDTOs = foundFeeds.stream()
                .map(FeedsDTO::new)
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();

        response.put("user", foundUser);
        response.put("feeds", feedDTOs);
        return response;
    }

    /*
    피드에 좋아요 누르기
    - 해당 피드를 찾아 좋아요 + 1 한 후, 응답으로 feedId, 좋아요 수 반환
     */

    public Map<String, Object> likeFeed(Integer feedId) {
        Feed foundFeed = findFeedById(feedId);
        foundFeed.plusFeedLikes();
        Map<String, Object> response = new HashMap<>();
        response.put("feedId", foundFeed.getFeedId());
        response.put("likes", foundFeed.getLikes());
        return response;
    }

}
