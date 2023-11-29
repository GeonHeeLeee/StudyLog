package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.entity.Schedule;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.ScheduleNotFoundException;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.repository.ScheduleRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    /*
    처음 스케쥴 등록 요청 메서드
    - 시작시간, 끝난 시간 제외하고 ToDo만 등록
    - 이후 반환 값으로 scheduleId, 200 OK 반환(변경 가능)
    - 만약 해당 userId의 User 존재하지 않을 시 400 반환
     */
    @Transactional
    public Map<String, Object> registerSchedule(ScheduleDTO scheduleDTO) {
        User user = userRepository.findUserById(scheduleDTO.getUserId());
        if(user == null){
            throw new UserNotFoundException();
        }
        Schedule schedule = new Schedule(user, scheduleDTO);
        Integer scheduleId = scheduleRepository.saveAndGetScheduleId(schedule);
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
        Schedule schedule = scheduleRepository.findScheduleById(scheduleId);
        if(schedule == null){
            throw new ScheduleNotFoundException();
        }
        boolean state = schedule.changeDoneState();
        Map<String, Object> response = new HashMap<>();
        response.put("scheduleId", scheduleId);
        response.put("done", state);
        return response;
    }

}
