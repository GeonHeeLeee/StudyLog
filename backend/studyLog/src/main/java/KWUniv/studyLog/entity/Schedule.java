package KWUniv.studyLog.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Schedule {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private String toDo;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

}
