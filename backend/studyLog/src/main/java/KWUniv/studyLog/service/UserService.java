package KWUniv.studyLog.service;

import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id : " + userId));
    }

    public void save(User user) {
        userRepository.save(user);
    }


}
