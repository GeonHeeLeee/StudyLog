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
public class LoginController {

    @Autowired
    private LoginService loginService;

    /*
    회원 가입 메서드
     */
    @PostMapping("/join")
    public ResponseEntity registerUser(@RequestBody User user) {
        boolean isRegistered = loginService.registerUser(user);
        if(isRegistered){
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    중복 ID 체크
    - 중복 아이디 있을 시 400
    - 중복 아이디 없을 시 200
     */
    @GetMapping("/join/checkId")
    public ResponseEntity checkId(@RequestParam String userId) {
        boolean idExisted =  loginService.checkDuplicateId(userId);
        if(idExisted){
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }



    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        boolean isLoggedIn =  loginService.loginCheck(user);
        if(isLoggedIn){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //logout도 구현하기
}
