package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.exception.ScheduleNotFoundException;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;


@Controller
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    /*
    첫 스케줄 등록 메서드
    - 현재 scheduleId 반환
     */
    @PostMapping
    public ResponseEntity registerSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        try {
            Map response = scheduleService.registerSchedule(scheduleDTO);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    스케줄 상태 변경(완료, 미완료)
    - 만약 스케줄이 true면 false로, false면 true로 변환
     */
    @PostMapping("/done")
    public ResponseEntity changeScheduleState(@RequestParam Integer scheduleId) {
        try {
            Map response = scheduleService.changeScheduleState(scheduleId);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (ScheduleNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}
