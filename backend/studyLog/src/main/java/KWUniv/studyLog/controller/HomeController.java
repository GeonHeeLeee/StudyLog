package KWUniv.studyLog.controller;

import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    private final FeedRepository feedRepository;
    private final FollowingRepository followingRepository;

    @GetMapping("/home")
    public ResponseEntity<Map<String, Object>> getFeeds(@RequestParam("userId") String userId,
                                                        @RequestParam("page") int page,
                                                        HttpServletRequest request) {
        // 팔로잉한 사용자의 목록을 가져옵니다.
        List<Following> followings = followingRepository.findBySelfUser_UserId(userId);

        // 팔로잉한 사용자의 userId를 리스트로 만듭니다.
        List<String> followingUserIds = followings.stream()
                .map(following -> following.getFollowingUser().getUserId())
                .collect(Collectors.toList());

        // 페이지 번호는 0부터 시작이므로 입력받은 페이지 번호에서 1을 빼줍니다.
        Pageable pageable = PageRequest.of(page - 1, 5); // 한 페이지에 10개의 게시물을 보여주도록 설정

        // 팔로잉한 사용자의 피드를 가져옵니다.
        Page<Feed> feedPage = feedRepository.findByUser_UserIdIn(followingUserIds, pageable);
        //후에 FeedDTO로 변경하던지 해야될듯

        Map<String, Object> response = new HashMap<>();
        response.put("feeds", feedPage.getContent());

        //피드가 충분하다면 next의 url 넣기
        if (feedPage.getNumber() + 1 < feedPage.getTotalPages()) {
            String nextUrl = request.getRequestURL().toString() + "?userId=" + userId + "&page=" + (page + 1);
            response.put("next", nextUrl);
        } else {
            //5개 이하라면 next에 null을 넣기
            response.put("next", null);
        }
        return ResponseEntity.ok(response);
    }


}
