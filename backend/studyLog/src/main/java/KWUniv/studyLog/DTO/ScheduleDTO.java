package KWUniv.studyLog.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ScheduleDTO {
    private Integer scheduleId;
    private String userId;
    private String toDo;
    private LocalDate date;
    private boolean done;
}
