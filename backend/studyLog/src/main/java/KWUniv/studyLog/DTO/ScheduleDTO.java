package KWUniv.studyLog.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter
public class ScheduleDTO {
    private Integer scheduleId;
    private String userId;
    private String toDo;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}
