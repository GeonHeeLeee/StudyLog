package KWUniv.studyLog.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Following {

    @Id @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selfId") //자동적으로 User 테이블의 PK와 연결 - selfId는 이 테이블에서 사용할 컬럼 명
    private User selfUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followingId")
    private User followingUser;

    public Following(User selfUser, User followingUser){
        this.selfUser = selfUser;
        this.followingUser = followingUser;
    }
}
