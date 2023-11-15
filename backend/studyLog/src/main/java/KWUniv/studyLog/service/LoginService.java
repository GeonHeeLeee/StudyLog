package KWUniv.studyLog.service;

import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public boolean regiserUser(User user) {
        if(validateUser(user))
            return false;
        userRepository.save(user);
        return true;
    }

    /*
    중복 유저 검사 메서드
    - 동일 아이디 존재 검사 후 해당 아이디의 유저 존재 시 true, 없을 시 false 반환
    */
    public boolean validateUser(User user) {
        Optional<User> findUser = Optional.ofNullable(userRepository.findUserById(user.getUserId()));
        return findUser.isPresent();
    }

    public User loginCheck(User user) {
        Optional<User> findUser = Optional.ofNullable(userRepository.findUserById(user.getUserId()));
        return (findUser.isPresent() && findUser.get().getPassword().equals(user.getPassword())) ?
                 findUser.get() :  null;
    }

}
