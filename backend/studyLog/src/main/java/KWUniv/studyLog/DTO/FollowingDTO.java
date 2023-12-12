package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.repository.FollowingRepository;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowingDTO {

    private String selfId;
    private String followingId;

}
