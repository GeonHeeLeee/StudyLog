package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Timer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TimerRepository extends JpaRepository<Timer, Integer> {
    Timer findByUser_UserIdAndDate(String userId, LocalDate date);
}
