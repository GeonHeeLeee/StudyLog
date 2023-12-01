package KWUniv.studyLog.service;

import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final FollowingRepository followingRepository;
    private final FeedRepository feedRepository;
}
