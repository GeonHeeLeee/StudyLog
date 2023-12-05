package KWUniv.studyLog.Config;

import KWUniv.studyLog.entity.Comment;
import KWUniv.studyLog.entity.Feed;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.CommentRepository;
import KWUniv.studyLog.repository.FeedRepository;
import KWUniv.studyLog.repository.FollowingRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.FollowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
@RequiredArgsConstructor
public class DummyData {
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final FollowingRepository followingRepository;
    private final CommentRepository commentRepository;
    private final FollowingService followingService;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // 30명의 더미 User 생성
            List<User> users = new ArrayList<>();
            for (int i = 0; i < 30; i++) {
                User user = new User("user" + i, "password" + i, "name" + i, "010-1234-56" + i, "user" + i + "@example.com", 1990 + (i % 30), 0, 0);
                users.add(userRepository.save(user));
            }

            // 각 User마다 10개의 더미 Feed 생성 및 Comment 생성
            for (User user : users) {
                for (int j = 0; j < 10; j++) {
                    Feed feed = new Feed(user, "feedBody" + j, "photoUrl" + j);
                    feedRepository.save(feed);

                    // 랜덤한 User가 Comment를 담
                    Comment comment = new Comment(users.get(new Random().nextInt(users.size())), feed, "commentBody" + j);
                    commentRepository.save(comment);
                }
            }

            // 각 User마다 랜덤한 User를 팔로우
            for (User user : users) {
                User randomUser = users.get(new Random().nextInt(users.size()));
                followingService.plusFollowingCount(user, randomUser);
                Following following = new Following(user, randomUser);
                followingRepository.save(following);
                userRepository.save(user);
                userRepository.save(randomUser);
            }
        };
    }
}
