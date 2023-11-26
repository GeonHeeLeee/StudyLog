package KWUniv.studyLog.controller;


import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.service.FeedService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
public class FeedController {

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private FeedService feedService;

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
     */
    @PostMapping("/feed")
    public ResponseEntity<Void> postAndSaveFeed(@RequestBody Feed feed) {
        feedRepository.save(feed);
        //Feed post시에 실패하는 경우가 있나? - 생각해보고 구현하기
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
