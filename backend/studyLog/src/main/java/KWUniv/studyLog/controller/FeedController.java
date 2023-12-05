package KWUniv.studyLog.controller;


import KWUniv.studyLog.DTO.CommentDTO;
import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.DTO.FeedWithCommentDTO;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.exception.FeedNotFoundException;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;

    /*
    특정 피드 조회
    - 찾는 피드가 없으면 HTTPSTATUS 404
    - 특정 피드를 찾으면 HTTPSTATUS 200
     */
    @GetMapping
    public ResponseEntity<FeedWithCommentDTO> getSelectedFeed(@RequestParam String userId,
                                                              @RequestParam Integer feedId) {
        Feed foundFeed = feedService.findFeedById(feedId);
        if (foundFeed == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        FeedWithCommentDTO feedResponseDTO = new FeedWithCommentDTO(foundFeed);

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
        boolean isPosted = feedService.postAndSaveFeed(feedDTO);
        if (isPosted) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }


    /*
    특정 피드에 댓글 달기
    - 해당 userId의 user나 feedId의 feed가 없을 시 400 Return
    - 등록 성공 시 200
     */
    @PostMapping("/comment")
    public ResponseEntity writerComment(@RequestBody CommentDTO commentDTO) {
        try {
            feedService.writeComment(commentDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    특정 피드에 좋아요 누르기
     - 해당 피드를 찾아 좋아요 + 1 한 후, 응답으로 feedId, 좋아요 수 반환
     */
    @GetMapping("/like")
    public ResponseEntity likeFeed(@RequestParam Integer feedId) {
        try {
            Map response = feedService.likeFeed(feedId);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    피드 수정 메서드
    -feedId를 받아서 feedBody 수정
     */
    @PostMapping("/modify")
    public ResponseEntity modifyFeed(@RequestBody FeedDTO feedDTO) {
        try {
            feedService.modifyFeedBody(feedDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (FeedNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    특정 피드 삭제 메서드
     */
    @PostMapping("/delete")
    public ResponseEntity deleteFeed(@RequestBody FeedDTO feedDTO) {
        try {
            feedService.deleteFeed(feedDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (FeedNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
