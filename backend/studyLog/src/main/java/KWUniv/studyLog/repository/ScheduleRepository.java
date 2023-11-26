package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class ScheduleRepository {

    private final EntityManager em;

    public Integer saveAndGetId(Schedule schedule){
        em.persist(schedule);
        return schedule.getScheduleId();
    }

    public void save(Schedule schedule){
        em.persist(schedule);
    }

    public Schedule findScheduleById(Integer scheduleId){
        return em.find(Schedule.class, scheduleId);
    }

}
