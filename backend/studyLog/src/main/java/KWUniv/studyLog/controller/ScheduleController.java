package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.ScheduleDTO;
import KWUniv.studyLog.exception.ScheduleNotFoundException;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
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
    해당 날짜의 스케쥴 반환 메서드
     */
    @GetMapping
    public ResponseEntity getSchedulesOfTheDate(@RequestParam String userId,
                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<ScheduleDTO> scheduleDTOList = scheduleService.getSchedulesOfTheDate(userId, date);
            Map<String, Object> response = new HashMap<>();
            response.put("schedules", scheduleDTOList);
            return new ResponseEntity(response,HttpStatus.OK);
        } catch(ScheduleNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    /*
    스케줄 상태 변경(완료, 미완료)
    - 만약 스케줄이 true면 false로, false면 true로 변환
     */
    @PostMapping("/done")
    public ResponseEntity changeScheduleState(@RequestBody ScheduleDTO scheduleDTO) {
        try {
            Map response = scheduleService.changeScheduleState(scheduleDTO.getScheduleId());
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (ScheduleNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }



}
