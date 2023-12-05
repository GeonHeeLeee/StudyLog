package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.TimerDTO;
import KWUniv.studyLog.entity.Timer;
import KWUniv.studyLog.repository.TimerRepository;
import KWUniv.studyLog.service.TimerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class TimerController {

    private final TimerService timerService;

    @PostMapping("/timer")
    public ResponseEntity plusUserStudyTimer(@RequestBody TimerDTO timerDTO) {
        try {
            Integer studyTime = timerService.modifyTimer(timerDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", timerDTO.getUserId());
            response.put("date", timerDTO.getDate());
            response.put("studyTime", studyTime);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
