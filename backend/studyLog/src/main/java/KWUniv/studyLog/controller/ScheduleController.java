package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.entity.Schedule;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.ScheduleRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
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
    스케줄 상태 변경(완료, 미완료)
    - 만약 스케줄이 true면 false로, false면 true로 변환
     */
    @PostMapping("/done")
    public ResponseEntity changeScheduleState(@RequestParam Integer scheduleId){
        return scheduleService.changeScheduleState(scheduleId);
    }




}
