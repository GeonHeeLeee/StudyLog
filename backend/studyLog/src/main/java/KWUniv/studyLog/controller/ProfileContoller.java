package KWUniv.studyLog.controller;

import KWUniv.studyLog.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileContoller {


    private final FeedService feedService;
    /*
    Get으로 쿼리파라미터로 userId만 주면 해당 userId의 정보 반환
    - 이후 타이머 기능 구현 시, 잔디밭도 함께 보내주기
     */
    @GetMapping
    public ResponseEntity<?> getUserProfile(@RequestParam String userId) {
        //사용자 정보, 사용자가 올린 피드
        return feedService.findUserAndFeedSend(userId);
    }


}
