package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.TimerDTO;
import KWUniv.studyLog.DTO.UserDTO;
import KWUniv.studyLog.entity.Timer;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.repository.TimerRepository;
import KWUniv.studyLog.service.FeedService;
import KWUniv.studyLog.service.TimerService;
import KWUniv.studyLog.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileContoller {


    private final FeedService feedService;
    private final UserService userService;
    private final TimerService timerService;
    /*
    Get으로 쿼리파라미터로 userId만 주면 해당 userId의 정보 반환
    - 유저가 올린 피드들도 반환
    - 또한, 유저의 타이머 목록도 상태를 지정하여 반환
     */
    @GetMapping
    public ResponseEntity<?> getUserProfile(@RequestParam String userId) {
        //사용자 정보, 사용자가 올린 피드
        try {
            Map response = feedService.findUserAndFeed(userId);
            List<TimerDTO> timerDTOList = timerService.getUserTimerDTOList(userId);
            response.put("timers", timerDTOList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    프로필 검색 기능
    - 보내준 키워드마다 DB 조회해서 반환
     */
    @PostMapping("/search")
    public ResponseEntity searchUserByIdContaining(@RequestBody UserDTO userDTO) {
        List<UserDTO> userDTOList = userService.findUserByIdContaining(userDTO.getUserId());
        return new ResponseEntity(userDTOList, HttpStatus.OK);
    }

}
