package KWUniv.studyLog.service;

import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
@Slf4j
@RequiredArgsConstructor
public class LoginService {

    private final UserService userService;

    @Transactional
    public boolean registerUser(User user) {
        if (validateUser(user))
            return false;
        userService.save(user);
        return true;
    }

    public boolean validateUser(User user) {
        try {
            userService.findUserById(user.getUserId());
            return true;
        } catch (UserNotFoundException e) {
            return false;
        }
    }

    public boolean loginCheck(User user) {
        try {
            User findUser = userService.findUserById(user.getUserId());
            return findUser.getPassword().equals(user.getPassword());
        } catch (UserNotFoundException e) {
            return false;
        }
    }

    public boolean checkDuplicateId(String userId) {
        try {
            userService.findUserById(userId);
            return false;
        } catch (UserNotFoundException e) {
            return true;
        }
    }

    public void createSession(HttpServletRequest request, String userId) {
        HttpSession session = request.getSession();
        session.setAttribute("user", userId);
    }
}