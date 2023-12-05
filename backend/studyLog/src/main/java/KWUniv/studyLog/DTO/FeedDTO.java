package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.Feed;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedDTO {
    private Integer feedId;
    private String writerId;
    private String feedBody;
    private String photo;
    private String likes;
    private String date;

    /*
    응답으로 FeedDTO 사용
     */
    public FeedDTO(Feed feed) {
        this.feedId = feed.getFeedId();
        this.writerId = feed.getUser().getUserId();
        this.feedBody = feed.getFeedBody();
        this.photo = feed.getPhoto();
        this.likes = feed.getLikes().toString();
        this.date = feed.getDate().toString();
    }



}
