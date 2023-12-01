package KWUniv.studyLog.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue
    private Integer commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedId")
    private Feed feed; //Feed 테이블의 feedId와 연결

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private LocalDateTime date;
    private String commentBody;


    /*
    댓글 동록 시 사용
     */
    public Comment(User user, Feed feed, String commentBody) {
        this.feed = feed;
        this.user = user;
        this.date = LocalDateTime.now();
        this.commentBody = commentBody;
    }
}
