package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.DTO.FeedResponseDTO;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final FeedService feedService;

//    @GetMapping("/home")
//    public ResponseEntity<FeedResponseDTO> getFeeds(@RequestParam String userId, @RequestParam int page) {
//        Pageable pageable = PageRequest.of(page - 1, 5);  // page는 0부터 시작하므로 -1
//        Page<Feed> feedsPage = feedService.findFeedsByUserId(userId, pageable);
//
//        List<FeedDTO> feedDTOs = feedsPage.getContent().stream()
//                .map(feed -> new FeedDTO(feed.getUser().getUserId(), feed.getFeedBody(), feed.getPhoto()))  // Feed를 FeedDTO로 변환
//                .collect(Collectors.toList());
//
//        FeedResponseDTO feedResponseDTO = new FeedResponseDTO();
//        feedResponseDTO.setFeeds(feedDTOs);
//        if (feedsPage.hasNext()) {  // 다음 페이지가 있으면
//            feedResponseDTO.setNext(String.format("localhost:8080/home?userId=%s&page=%d", userId, page + 1));
//        }
//
//        return new ResponseEntity<>(feedResponseDTO, HttpStatus.OK);
//    }

}
