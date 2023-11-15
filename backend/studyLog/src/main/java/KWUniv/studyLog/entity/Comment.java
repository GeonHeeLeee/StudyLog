package KWUniv.studyLog.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id @GeneratedValue
    private Integer commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedId")
    private Feed feed; //Feed 테이블의 feedId와 연결

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writerId")
    private User user;

    private LocalDateTime date;
    private String commentBody;


}
