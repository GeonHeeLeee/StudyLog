package KWUniv.studyLog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Following {

    @Id @GeneratedValue
    private Integer id;

    private String selfId; //User 테이블의 userId와 연결
    private String FollowingId; //User 테이블의 userId와 연결

}
