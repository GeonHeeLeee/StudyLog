package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.entity.Schedule;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.ScheduleRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;


@Controller
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    /*
    첫 스케줄 등록 메서드
     */
    @PostMapping
    public ResponseEntity registerSchedule(@RequestBody ScheduleDTO scheduleDTO){
        return scheduleService.registerSchedule(scheduleDTO);
    }

    /*
    스케줄의 start, endTime 저장 메서드
     */
    @PostMapping("/time")
    public ResponseEntity setStartAndEndTimeInSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        return scheduleService.setStartAndEndTimeInSchedule(scheduleDTO);
    }



}
