package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.FollowingDTO;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.FollowingRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowingService {

    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;

    /*
    selfId의 팔로잉 + 1, followingId의 팔로워 + 1
     */
    public void plusFollowingCount(User selfUser, User followingUser) {
        selfUser.plusFollowingCount();
        followingUser.plusFollowerCount();
    }

    /*
    self와 following을 찾고, 만약 둘다 값이 있으면 Following 객체를 만들어 저장
    - 만약 self와 following 둘 중 하나라도 없으면 false 반환
    - 성공적이면 true 반환
     */
    @Transactional
    public boolean findSaveFollowingAndSelf(FollowingDTO followingDTO){
        Optional<User> selfUser = Optional.ofNullable(userRepository.findUserById(followingDTO.getSelfId()));
        Optional<User> followingUser = Optional.ofNullable(userRepository.findUserById(followingDTO.getFollowingId()));

        if(selfUser.isEmpty() || followingUser.isEmpty()){
            return false;
        }
        plusFollowingCount(selfUser.get(), followingUser.get());
        Following following = new Following(selfUser.get(), followingUser.get());
        followingRepository.save(following);
        return true;
    }
}
