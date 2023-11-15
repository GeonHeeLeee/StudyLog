package KWUniv.studyLog.controller;


import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
@RequestMapping("/users")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity registerUser(@RequestBody User user) {
        boolean registerUserResult = loginService.regiserUser(user);
        return registerUserResult ? new ResponseEntity<>(HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User loginCheckUser = loginService.loginCheck(user);
        if(loginCheckUser != null) {
            return new ResponseEntity<>(loginCheckUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
