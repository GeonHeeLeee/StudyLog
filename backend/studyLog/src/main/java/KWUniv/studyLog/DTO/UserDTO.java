package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserDTO {

    private String userId;
    private String userName;
    //이후 유저 사진 URL
    private String profilePhoto;
    private String profilePhrase;
    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.userName = user.getName();
        this.profilePhoto = user.getProfilePhoto();
        this.profilePhrase = user.getProfilePhrase();
    }
}
