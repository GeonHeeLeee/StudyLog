package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.FeedDTO;
import KWUniv.studyLog.DTO.TimerDTO;
import KWUniv.studyLog.entity.Timer;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.TimerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimerService {

    private final TimerRepository timerRepository;
    private final UserService userService;

    /*
    userId와 date로 Timer를 찾아서 반환
    - 값이 없을 수도 있기 때문에 Optional 반환
     */
    public Optional<Timer> getTimerByUserIdAndDate(String userId, LocalDate date){
        return Optional.ofNullable(timerRepository.findByUser_UserIdAndDate(userId,date));
    }


    /*
    TimerDTO를 받아서 User를 찾고 DB에 저장
     */
    @Transactional
    public void registerTimer(TimerDTO timerDTO) {
        User user = userService.findUserById(timerDTO.getUserId());
        Timer timer = new Timer(timerDTO,user);
        timerRepository.save(timer);
    }

    /*
    타이머가 없다면 이를 생성하고 저장
    - 만약 타이머가 존재한다면 해당 타이머를 찾아서 studyTime 갱신 후 반환
     */
    @Transactional
    public Integer modifyTimer(TimerDTO timerDTO) {
        String userId = timerDTO.getUserId();
        LocalDate date = timerDTO.getDate();
        Integer studyTime;

        if(getTimerByUserIdAndDate(userId, date).isEmpty()) {
            registerTimer(timerDTO);
            studyTime = timerDTO.getStudyTime();
        } else {
            Timer foundTimer = getTimerByUserIdAndDate(userId, date).get();
            studyTime = foundTimer.plusStudyTime(timerDTO.getStudyTime());
        }
        return studyTime;
    }

    /*
    프로필의 잔디밭 구현을 위해 timerDTOList 반환
     */
    @Transactional
    public List<TimerDTO> getUserTimerDTOList(String userId) {
        List<Timer> timerList = timerRepository.findAllByUser_UserId(userId);
        List<TimerDTO> timerDTOList = timerList.stream()
                .map(TimerDTO::new)
                .collect(Collectors.toList());

        return timerDTOList;
    }

}
