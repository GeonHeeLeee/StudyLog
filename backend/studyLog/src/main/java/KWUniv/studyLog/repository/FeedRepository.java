package KWUniv.studyLog.repository;


import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FeedRepository {


    private final EntityManager em;


    @Transactional
    public void save(Feed feed) {
        em.persist(feed);
    }

    public Feed findFeedById(Integer feedId) {
        return em.find(Feed.class, feedId);
    }


    /*
    작성자의 ID를 받아서 작성자가 쓴 글을 반환해주는 메서드
    - List 형태로 반환
     */
    public List<Feed> findFeedsByWriterId(String writerId) {
        return em.createQuery("select f from Feed f where f.user.userId = : writerId", Feed.class)
                .setParameter("writerId", writerId)
                .getResultList();
    }

//    public List<Comment> getCommentsByFeedId(int feedId) {
//
//    }
}
