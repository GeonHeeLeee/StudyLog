package KWUniv.studyLog.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class User {

    @Id
    private String userId;
    private String password;
    private String name;
    private double phoneNumber;
    private String email;
    private int birth;

    private Integer followerCount;
    private Integer followingCount;

    //private Interger profilePhoto 추후에 필요하다면 프로필 사진도


}
