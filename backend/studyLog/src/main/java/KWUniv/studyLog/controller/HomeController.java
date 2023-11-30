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


//    @GetMapping("/home")
//    public FeedResponse getFeeds(@RequestParam String userId, @RequestParam(defaultValue = "0") int page) {
//        PageRequest pageRequest = PageRequest.of(page, 10); // 10개씩 페이징
//        Page<Feed> feedPage = feedRepository.findAllByUserId(userId, pageRequest);
//
//        FeedResponse response = new FeedResponse();
//        response.setFeeds(feedPage.getContent());
//
//        if (feedPage.hasNext()) {
//            String next = "localhost:8080/home?userId=" + userId + "&page=" + (page + 1);
//            response.setNext(next);
//        }
//
//        return response;
//    }


}
