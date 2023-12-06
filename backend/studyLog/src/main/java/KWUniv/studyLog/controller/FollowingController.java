package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.FollowingDTO;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.service.FollowingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FollowingController {

    private final FollowingService followingService;


    /*
    해당 유저 팔로우
     */
    @PostMapping("/follow")
    @Transactional
    public ResponseEntity followUser(@RequestBody FollowingDTO followingDTO) {
        try {
            followingService.findSaveFollowingAndSelf(followingDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /*
    해당 유저 언팔로우
     */
    @PostMapping("/unfollow")
    public ResponseEntity unfollowUser(@RequestBody FollowingDTO followingDTO) {
        try {
            followingService.unfollowUser(followingDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
