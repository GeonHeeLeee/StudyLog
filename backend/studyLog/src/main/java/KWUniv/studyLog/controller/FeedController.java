package KWUniv.studyLog.controller;


import KWUniv.studyLog.DTO.CommentDTO;
import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.DTO.FeedResponseDTO;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/feed")
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
    @GetMapping
    public ResponseEntity<FeedResponseDTO> getSelectedFeed(@RequestParam String userId,
                                    @RequestParam Integer feedId){
        Feed foundFeed = feedService.findFeedById(feedId);
        if(foundFeed == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        FeedResponseDTO feedResponseDTO = new FeedResponseDTO(foundFeed);

        //Feed 객체를 조회할 때 해당 Feed에 연관된 Comment 리스트도 함께 조회된다.
        return new ResponseEntity<>(feedResponseDTO, HttpStatus.OK);
    }

    /*
    피드 Post 하기
    - 해당 userId의 user가 존재하지 않으면 400 반환
    - 성공 시 200
     */
    @PostMapping
    public ResponseEntity postAndSaveFeed(@RequestBody FeedDTO feedDTO) {
        return feedService.postAndSaveFeedAndSendResponse(feedDTO);
    }


    /*
    특정 피드에 댓글 달기
    - 해당 userId의 user나 feedId의 feed가 없을 시 400 Return
    - 등록 성공 시 200
     */
    @PostMapping("/comment")
    public ResponseEntity writerComment(@RequestBody CommentDTO commentDTO) {
        return feedService.writeCommentSendResponse(commentDTO);
    }

    /*
    특정 피드에 좋아요 누르기
     */
    @GetMapping("/like")
    @Transactional
    public ResponseEntity likeFeed(@RequestParam Integer feedId){
        return feedService.likeFeedAndSendResponse(feedId);
    }




}
