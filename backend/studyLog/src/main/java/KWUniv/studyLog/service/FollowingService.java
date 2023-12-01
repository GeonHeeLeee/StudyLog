package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.FollowingDTO;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowingService {

    private final FollowingRepository followingRepository;
    private final UserService userService;

    /*
    selfId의 팔로잉 + 1, followingId의 팔로워 + 1
     */
    public void plusFollowingCount(User selfUser, User followingUser) {
        selfUser.plusFollowingCount();
        followingUser.plusFollowerCount();
    }

    /*
    self와 following을 찾고, 만약 둘다 값이 있으면 Following 객체를 만들어 저장
    - 만약 self와 following 둘 중 하나라도 없으면 400 반환
    - 성공적이면 200 반환
     */
    @Transactional
    public void findSaveFollowingAndSelf(FollowingDTO followingDTO) {
        User selfUser = userService.findUserById(followingDTO.getSelfId());
        User followingUser = userService.findUserById(followingDTO.getFollowingId());

        //각자 follower, following + 1
        plusFollowingCount(selfUser, followingUser);

        //Following DB 저장
        Following following = new Following(selfUser, followingUser);
        followingRepository.save(following);
    }
}
