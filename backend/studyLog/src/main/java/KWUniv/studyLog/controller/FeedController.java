package KWUniv.studyLog.controller;


import KWUniv.studyLog.DTO.CommentDTO;
import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
@RequiredArgsConstructor
public class FeedController {


    private final FeedRepository feedRepository;

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    private final FeedService feedService;

    /*
    특정 피드 조회
    - 찾는 피드가 없으면 HTTPSTATUS 404
    - 특정 피드를 찾으면 HTTPSTATUS 200
     */
    @GetMapping("/feed")
    public ResponseEntity<Feed> getSelectedFeed(@RequestParam String userId,
                                    @RequestParam int feedId){
        Feed foundFeed = feedService.findFeedById(feedId);
        //여기서 Comment가 자동적으로 들어가는지 확인해야됨
        //Feed 객체를 조회할 때 해당 Feed에 연관된 Comment 리스트도 함께 조회된다.
        return (foundFeed != null) ? new ResponseEntity<>(foundFeed, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /*
    피드 Post 하기
    - 해당 userId의 user가 존재하지 않으면 400 반환
    - 성공 시 200
     */
    @PostMapping("/feed")
    public ResponseEntity postAndSaveFeed(@RequestBody FeedDTO feedDTO) {

        User user = userRepository.findUserById(feedDTO.getWriterId());
        if(user == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
            //유저가 존재하지 않으면 400 반환
        }
        Feed feed = new Feed(user, feedDTO.getFeedBody(), feedDTO.getPhoto());
        feedRepository.save(feed);
        return new ResponseEntity(HttpStatus.OK);
    }


    /*
    특정 피드에 댓글 달기
    - 해당 userId의 user나 feedId의 feed가 없을 시 400 Return
    - 등록 성공 시 200
     */
    @PostMapping("/feed/comment")
    public ResponseEntity writerComment(@RequestBody CommentDTO commentDTO) {
        User user = userRepository.findUserById(commentDTO.getUserId());
        Feed feed = feedRepository.findFeedById(commentDTO.getFeedId());
        if(user == null || feed == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Comment comment = new Comment(user, feed, commentDTO.getCommentBody());
        commentRepository.save(comment);
        return new ResponseEntity(HttpStatus.OK);
    }
}
