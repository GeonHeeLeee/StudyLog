package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.Timer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TimerDTO {

    private Integer id;

    private String userId;

    private Integer studyTime;

    private LocalDate date;

    private Integer state;

    public TimerDTO(Timer timer) {
        this.id = timer.getId();
        this.userId = timer.getUser().getUserId();
        this.studyTime = timer.getStudyTime();
        this.state = calculateState(studyTime);
        this.date = timer.getDate();
    }

    /*
    공부 시간에 따른 잔디밭 상태 로직
    - 0시간 == 0
    - 0 ~ 2시간 == 1
    - 2 ~ 4시간 == 2
    - 4 ~ 6시간 == 3
    - 6시간 이상 == 4
     */
    private Integer calculateState(Integer studyTime) {
        if (studyTime == 0) {
            return 0;
        } else if (studyTime > 0 && studyTime < 7200) {
            return 1;
        } else if (studyTime >= 7200 && studyTime < 14400) {
            return 2;
        } else if (studyTime >= 14400 && studyTime < 21600) {
            return 3;
        } else {
            return 4;
        }
    }
}
