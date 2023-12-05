package KWUniv.studyLog.entity;

import KWUniv.studyLog.DTO.TimerDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Timer {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private Integer studyTime = 0;
    private LocalDate date;

    public Timer(TimerDTO timerDTO, User user) {
        this.user = user;
        this.studyTime = timerDTO.getStudyTime();
        this.date = timerDTO.getDate();
    }

    public Integer plusStudyTime(Integer studyTime){
        return this.studyTime += studyTime;
    }
}
