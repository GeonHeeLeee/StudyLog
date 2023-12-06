package KWUniv.studyLog.service;

import KWUniv.studyLog.DTO.UserDTO;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    /*
    id로 유저 검색 기능 - 해당 id를 포함하는 모든 것 반환
     */
    public List<UserDTO> findUserByIdContaining(String userId) {
        List<User> foundUser = userRepository.findByUserIdContaining(userId);
        List<UserDTO> userDTOList = foundUser.stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
        return userDTOList;
    }

    /*
    프로필 편집 메서드
     */
    @Transactional
    public void editUserProfile(UserDTO userDTO) {
        User foundUser = findUserById(userDTO.getUserId());
        foundUser.setProfilePhoto(userDTO.getProfilePhoto());
        foundUser.setProfilePhrase(userDTO.getProfilePhrase());
    }

}
