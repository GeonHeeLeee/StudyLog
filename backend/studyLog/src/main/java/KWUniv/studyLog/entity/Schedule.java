package KWUniv.studyLog.entity;

import KWUniv.studyLog.DTO.ScheduleDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Schedule {
    /*
    각 날짜의 스케쥴
    - 한 날짜의 ToDoList가 여러개 일 수 있으니까 ToDoList를 따로 클래스로 만들어 다대다 매핑
     */

    @Id
    @GeneratedValue
    private Integer scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private LocalDate date;

    private String toDo;

    private boolean done;

    public Schedule(User user, ScheduleDTO scheduleDTO) {
        this.user = user;
        this.date = LocalDate.now();
        this.toDo = scheduleDTO.getToDo();
        this.done = false;
    }

    public boolean changeDoneState() {
        if (this.done) {
            this.done = false;
        } else {
            this.done = true;
        }
        return this.done;
    }


}
