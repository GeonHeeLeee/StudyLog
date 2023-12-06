package KWUniv.studyLog.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String userId;
    private String password;
    private String name;
    private int birth;
    private String profilePhoto;
    private String profilePhrase;
    private Integer followerCount = 0;
    private Integer followingCount = 0;


    //private Interger profilePhoto 추후에 필요하다면 프로필 사진도

    public void plusFollowerCount() {
        this.followerCount += 1;
    }

    public void plusFollowingCount() {
        this.followingCount += 1;
    }

    public void minusFollowerCount() { this.followerCount -= 1; }

    public void minusFollowingCount() { this.followingCount -= 1; }
    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }
    public void setProfilePhrase(String profilePhrase) {
        this.profilePhrase = profilePhrase;
    }
}
