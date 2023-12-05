package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.DTO.FeedWithCommentDTO;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.exception.FeedNotFoundException;
import KWUniv.studyLog.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HomeService {

    private final FollowingService followingService;
    private final FeedRepository feedRepository;


    /*
    다음 피드가 있는지 확인
    - 피드가 있다면 true
    - 없다면 null
     */
    public boolean hasMoreFeeds(String userId, int page) {
        List<String> followingUserIds = followingService.getFollowingUserIds(userId);

        Pageable pageable = PageRequest.of(page - 1, 5);

        Page<Feed> feedPage = feedRepository.findByUser_UserIdIn(followingUserIds, pageable);

        return feedPage.getNumber() + 1 < feedPage.getTotalPages();
    }

    /*
    해당 유저가 팔로잉 하고 있는 user의 Feed 가져오기
    - 응답을위해 FeedsDTO로 변환 후 응답
     */
    public List<FeedWithCommentDTO> getMainPageFeeds(String userId, int page) throws FeedNotFoundException {
        List<String> followingUserIds = followingService.getFollowingUserIds(userId);

        Pageable pageable = PageRequest.of(page - 1, 5);

        Page<Feed> feedPage = feedRepository.findByUser_UserIdIn(followingUserIds, pageable);

        return feedPage.stream()
                .map(FeedWithCommentDTO::new)
                .collect(Collectors.toList());
    }
}

