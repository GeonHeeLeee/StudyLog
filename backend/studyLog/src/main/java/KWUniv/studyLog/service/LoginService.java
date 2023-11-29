package KWUniv.studyLog.service;

import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@Service
@Slf4j
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    /*
    유저 회원가입 메서드
    - 성공 시 200
    - 실패 시 400
     */
    @Transactional
    public boolean registerUser(User user) {
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

    /*
    로그인 메서드
    - 비밀번호 유저가 존재하고 비밀번호 일치 시 200
    - 없거나 일치하지 않으면 400
     */
    public boolean loginCheck(User user) {
        Optional<User> findUser = Optional.ofNullable(userRepository.findUserById(user.getUserId()));
        return (findUser.isPresent() && findUser.get().getPassword().equals(user.getPassword()));
    }

    /*
    중복 ID 체크 메서드
    - 중복 아이디 존재 할 시 400,
    - 중복 아이디 존재 안할 시 200
     */
    public boolean checkDuplicateId(String userId) {
        Optional<User> findUser = Optional.ofNullable(userRepository.findUserById(userId));
        return findUser.isEmpty();
    }

    /*
    세션 생성 메서드
    - 해당 유저 아이디로 세션을 생성하고 넣어줌
     */
    public void createSession(HttpServletRequest request, String userId) {
        HttpSession session = request.getSession();
        session.setAttribute("user", userId);
    }

}
