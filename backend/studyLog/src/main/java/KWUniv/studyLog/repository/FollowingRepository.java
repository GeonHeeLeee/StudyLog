package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowingRepository extends JpaRepository<Following, Integer> {
    // 필요한 추가 메소드를 여기에 선언하면 됩니다.
}
