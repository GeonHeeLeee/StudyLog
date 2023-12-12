package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {
    List<Feed> findByUser_UserId(String userId);
    Page<Feed> findByUser_UserIdIn(List<String> userIds, Pageable pageable);
}


