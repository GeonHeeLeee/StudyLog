package KWUniv.studyLog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Feed {

    @Id @GeneratedValue
    private Integer feedId;

    private String writerId; //User 테이블의 userId와 연결
    private LocalDateTime date;
    private Integer likes; //중복을 피하려면 생성해야 될 것 같음 - 배열, 테이블

    private String photo; //보통 Local에 저장하고 파일의 경로를 저장한다.
}