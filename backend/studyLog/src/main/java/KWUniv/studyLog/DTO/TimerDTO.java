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
