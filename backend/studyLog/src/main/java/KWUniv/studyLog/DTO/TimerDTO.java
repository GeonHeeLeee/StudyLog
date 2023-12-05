package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.Timer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TimerDTO {

    private Integer id;

    private String userId;

    private Integer studyTime;

    private LocalDate date;

}
