package KWUniv.studyLog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {

    @Id @GeneratedValue
    private Integer commentId;

    private Integer feedId; //Feed 테이블의 feedId와 연결

    private String writerId; //User 테이블의 userId와 연결

    private String commentBody;


}
