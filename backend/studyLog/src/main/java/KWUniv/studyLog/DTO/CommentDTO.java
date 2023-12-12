package KWUniv.studyLog.DTO;


import KWUniv.studyLog.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {

    private String userId;
    private Integer feedId;
    private String commentBody;

    public CommentDTO(Comment comment) {
        this.userId = comment.getUser().getUserId();
        this.commentBody = comment.getCommentBody();
        this.feedId = comment.getFeed().getFeedId();
    }
}
