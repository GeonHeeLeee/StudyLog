package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class CommentRepository {

    private final EntityManager em;

    @Transactional
    public void save(Comment comment) {
        em.persist(comment);
    }

    public Comment findCommentById(Integer commentId) {
        return em.find(Comment.class, commentId);
    }
}
