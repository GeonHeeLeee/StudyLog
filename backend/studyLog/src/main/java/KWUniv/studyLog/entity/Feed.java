package KWUniv.studyLog.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Feed {

    @Id
    @GeneratedValue
    private Integer feedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writerId")
    private User user; //작성자 - User 테이블의 userId와 연결

    private String feedBody;
    private LocalDateTime date;
    private Integer likes; //중복을 피하려면 생성해야 될 것 같음 - 배열, 테이블

    private String photo; //보통 Local에 저장하고 파일의 경로를 저장한다.

    @OneToMany(mappedBy = "feed")
    private List<Comment> comments;

    /*
    피드 등록 시 사용
     */
    public Feed(User user, String feedBody, String photo) {
        this.user = user;
        this.feedBody = feedBody;
        this.photo = photo;
        this.date = LocalDateTime.now();
        this.likes = 0;
    }

    /*
    좋아요 누를 시 like + 1
     */
    public void plusFeedLikes() {
        this.likes += 1;
    }

}
