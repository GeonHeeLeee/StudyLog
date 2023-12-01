package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.FeedsDTO;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.exception.FeedNotFoundException;
import KWUniv.studyLog.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;


    /*
    메인 피드 무한 스크롤 구현
    - 응답이 있으면 응답
    - Exception이 나면 400
     */
    @GetMapping("/home")
    public ResponseEntity<Map<String, Object>> getFeeds(@RequestParam("userId") String userId,
                                                        @RequestParam("page") int page,
                                                        HttpServletRequest request) {
        try {
            List<FeedsDTO> feeds = homeService.getMainPageFeeds(userId, page);
            boolean hasMoreFeeds = homeService.hasMoreFeeds(userId, page);

            Map<String, Object> response = new HashMap<>();
            response.put("feeds", feeds);

            if (hasMoreFeeds) {
                //피드가 있으면 next에 다음 URL 포함
                String nextUrl = request.getRequestURL().toString() + "?userId=" + userId + "&page=" + (page + 1);
                response.put("next", nextUrl);
            } else {
                //없으면 next를 NULL로
                response.put("next", null);
            }

            return ResponseEntity.ok(response);
        } catch (FeedNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
