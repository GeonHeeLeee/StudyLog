package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
//@RequiredArgsConstructor
//public class UserRepository {
//    private final EntityManager em;
//
//
//    public User findUserById(String userId){
//        return em.find(User.class,userId);
//    }
//
//
//    public void save(User user) {
//        em.persist(user);
//    }
//
//}
