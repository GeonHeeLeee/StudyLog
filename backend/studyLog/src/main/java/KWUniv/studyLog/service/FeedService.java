package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.CommentDTO;
import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.DTO.FeedResponseDTO;
import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.FeedNotFoundException;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public boolean postAndSaveFeed(FeedDTO feedDTO){
        Optional<User> user = Optional.ofNullable(userRepository.findUserById(feedDTO.getWriterId()));
        if(user.isEmpty()){
            return false;
        }
        Feed feed = new Feed(user.get(), feedDTO.getFeedBody(), feedDTO.getPhoto());
        feedRepository.save(feed);
        return true;
    }

    /*
    특정 피드에 Comment를 작성
    - 만약 작성자나 피드가 없으면 400
    - 성공 시 200
     */
    @Transactional
    public boolean writeComment(CommentDTO commentDTO) {
        User user = userRepository.findUserById(commentDTO.getUserId());
        Feed feed = feedRepository.findFeedById(commentDTO.getFeedId());
        if(user == null || feed == null) {
            throw new UserNotFoundException();
        }
        Comment comment = new Comment(user, feed, commentDTO.getCommentBody());
        commentRepository.save(comment);
        return true;
    }


    public List<Feed> findFeedsByUserId(String userId){
        return feedRepository.findFeedsByWriterId(userId);
    }

    /*
    프로필 조회 요청이 왔을 때, User와 User가 작성한 Feed 반환
    - 유저가 없을 시, 400 반환
     */
    @Transactional
    public Map<String, Object> findUserAndFeed(String userId) {
        User foundUser = userRepository.findUserById(userId);
        List<Feed> foundFeeds = findFeedsByUserId(userId);
        if(foundUser == null){
            throw new UserNotFoundException();
        }

        //무한참조 문제가 발생해 DTO로 응답
        List<FeedResponseDTO> feedDTOs = foundFeeds.stream()
                .map(feed -> new FeedResponseDTO(feed))
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();

        response.put("user",foundUser);
        response.put("feeds", feedDTOs);
        return response;
    }

    /*
    피드에 좋아요 누르기
    - 해당 피드를 찾아 좋아요 + 1 한 후, 응답으로 feedId, 좋아요 수 반환
     */
    @Transactional
    public Map<String, Object> likeFeed(Integer feedId) {
        Feed foundFeed = findFeedById(feedId);
        if(foundFeed == null){
            throw new UserNotFoundException();
        }
        foundFeed.plusFeedLikes();
        Map<String, Object> response = new HashMap<>();
        response.put("feedId", foundFeed.getFeedId());
        response.put("likes", foundFeed.getLikes());
        return response;
    }

//    public Page<Feed> findFeedsByUserId(String userId, Pageable pageable) {
//
//    }
}
