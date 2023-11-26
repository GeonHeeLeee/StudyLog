package KWUniv.studyLog.DTO;


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

}
