package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.Schedule;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleDTO {
    private Integer scheduleId;
    private String userId;
    private String toDo;
    private LocalDate date;
    private boolean done;

    public ScheduleDTO(Schedule schedule) {
        this.scheduleId = schedule.getScheduleId();
        this.userId = schedule.getUser().getUserId();
        this.toDo = schedule.getToDo();
        this.date = schedule.getDate();
        this.done = schedule.isDone();
    }
}
