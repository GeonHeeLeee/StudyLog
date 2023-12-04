package KWUniv.studyLog.DTO;

import KWUniv.studyLog.entity.Feed;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class SelectedFeedDTO {

    private Integer feedId;
    private String writerId;
    private LocalDateTime date;
    private String feedBody;
    private String photo;
    private List<CommentDTO> comments;
    private Integer likes;

    public SelectedFeedDTO(Feed feed) {
        this.feedId = feed.getFeedId();
        this.writerId = feed.getUser().getUserId();
        this.date = feed.getDate();
        this.feedBody = feed.getFeedBody();
        this.photo = feed.getPhoto();
        this.likes = feed.getLikes();
        this.comments = feed.getComments().stream()
                .map(CommentDTO::new)
                .collect(Collectors.toList());
    }
}
