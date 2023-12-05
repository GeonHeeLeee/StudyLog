package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.entity.Schedule;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.ScheduleNotFoundException;
import KWUniv.studyLog.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserService userService;

    public Schedule findScheduleById(Integer scheduleId){
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleNotFoundException("Schedule not found with id : " + scheduleId));
    }
    /*
    처음 스케쥴 등록 요청 메서드
    - 시작시간, 끝난 시간 제외하고 ToDo만 등록
    - 이후 반환 값으로 scheduleId, 200 OK 반환(변경 가능)
    - 만약 해당 userId의 User 존재하지 않을 시 400 반환
     */
    @Transactional
    public Map<String, Object> registerSchedule(ScheduleDTO scheduleDTO){
        User user = userService.findUserById(scheduleDTO.getUserId());
        Schedule schedule = new Schedule(user, scheduleDTO);
        Integer scheduleId = scheduleRepository.save(schedule).getScheduleId();
        Map<String, Object> response = new HashMap<>();
        response.put("scheduleId", scheduleId);
        return response;
    }

    /*
    스케줄 상태 변경(완료, 미완료)
    - 만약 스케줄이 true면 false로, false면 true로 변환
     */
    @Transactional
    public Map<String, Object> changeScheduleState(Integer scheduleId) {
        Schedule schedule = findScheduleById(scheduleId);
        if (schedule == null) {
            throw new ScheduleNotFoundException("Schedule not found with id : " + scheduleId);
        }
        boolean state = schedule.changeDoneState();
        Map<String, Object> response = new HashMap<>();
        response.put("scheduleId", scheduleId);
        response.put("done", state);
        return response;
    }

    /*
    특정 날짜의 스케줄 받기
    - 해당 유저와 해당 날짜에 유저가 등록한 할일들 반환
     */
    @Transactional
    public List<ScheduleDTO> getSchedulesOfTheDate(String userId, LocalDate date) throws ScheduleNotFoundException{
        List<Schedule> schedules = scheduleRepository.findByUser_UserIdAndDate(userId, date);
        if (schedules.isEmpty()) {
            throw new ScheduleNotFoundException("해당 날짜에 일정이 없습니다.");
        }
        return schedules.stream()
                .map(ScheduleDTO::new)
                .collect(Collectors.toList());
    }

}
