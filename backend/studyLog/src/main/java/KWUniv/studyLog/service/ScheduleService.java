package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.entity.Schedule;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.ScheduleRepository;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
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
    public ResponseEntity registerSchedule(ScheduleDTO scheduleDTO) {
        User user = userRepository.findUserById(scheduleDTO.getUserId());
        if(user == null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Schedule schedule = new Schedule(user, scheduleDTO);
        Integer scheduleId = scheduleRepository.saveAndGetId(schedule);
        return new ResponseEntity<>(scheduleId, HttpStatus.OK);
    }


    /*
    scheduleId로 요청을 받아 startTime, endTime 지정 메서드
    - 만약 해당 스케쥴을 찾을 수 없으면 400
    - 성공 시, schedule의 start, endTime 저장하고 200
     */
    @Transactional
    public ResponseEntity setStartAndEndTimeInSchedule(ScheduleDTO scheduleDTO) {
        LocalTime startTime = scheduleDTO.getStartTime();
        LocalTime endTime = scheduleDTO.getEndTime();
        Integer scheduleId = scheduleDTO.getScheduleId();

        Optional<Schedule> foundSchedule = Optional.ofNullable(scheduleRepository.findScheduleById(scheduleId));
        if(foundSchedule.isEmpty()) return new ResponseEntity(HttpStatus.BAD_REQUEST);

        foundSchedule.get().setStartTime(startTime);
        foundSchedule.get().setEndTime(endTime);
        return new ResponseEntity(HttpStatus.OK);
    }
}
