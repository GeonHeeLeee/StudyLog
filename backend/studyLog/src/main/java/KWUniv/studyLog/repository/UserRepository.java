package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
        List<User> findByUserIdContaining(String userId);
}