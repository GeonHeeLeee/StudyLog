package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
public class CommentRepository {

    @Autowired
    EntityManager em;

    @Transactional
    public void save(Comment comment) {
        em.persist(comment);
    }

    public Comment findCommentById(Integer commentId) {
        return em.find(Comment.class, commentId);
    }
}
