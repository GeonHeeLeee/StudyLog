package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Timer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TimerRepository extends JpaRepository<Timer, Integer> {
    Timer findByUser_UserIdAndDate(String userId, LocalDate date);
    List<Timer> findAllByUser_UserId(String userId);
}
