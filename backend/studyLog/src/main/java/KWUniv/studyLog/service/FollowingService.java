package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.FollowingDTO;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.FollowingRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    - 만약 self와 following 둘 중 하나라도 없으면 400 반환
    - 성공적이면 200 반환
     */
    @Transactional
    public boolean findSaveFollowingAndSelf(FollowingDTO followingDTO){
        Optional<User> selfUser = Optional.ofNullable(userRepository.findUserById(followingDTO.getSelfId()));
        Optional<User> followingUser = Optional.ofNullable(userRepository.findUserById(followingDTO.getFollowingId()));

        //만약 self나 following User가 존재하지 않는 경우
        if(selfUser.isEmpty() || followingUser.isEmpty()){
            return false;
        }

        //각자 follower, following + 1
        plusFollowingCount(selfUser.get(), followingUser.get());

        //Following DB 저장
        Following following = new Following(selfUser.get(), followingUser.get());
        followingRepository.save(following);
        return true;
    }
}
