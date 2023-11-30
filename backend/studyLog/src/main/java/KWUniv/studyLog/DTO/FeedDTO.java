package KWUniv.studyLog.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedDTO {
    private String writerId;
    private String feedBody;
    private String photo;
    private String likes;
    private String date;

    public FeedDTO(String userId, String feedBody, String photo) {
        this.writerId = userId;
        this.feedBody = feedBody;
        this.photo = photo;
    }
}
