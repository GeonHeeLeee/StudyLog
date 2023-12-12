package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowingRepository extends JpaRepository<Following, Integer> {
    // 무한 스크롤 팔로잉한 유저들만 보여주기
    List<Following> findBySelfUser_UserId(String userId);
    List<Following> findByFollowingUser_UserId(String userId);

    Following findFollowingBySelfUser_UserIdAndFollowingUser_UserId(String selfUserId, String followingUserId);

    Following findFollowingBySelfUserAndFollowingUser(User selfUser, User followingUser);

}
