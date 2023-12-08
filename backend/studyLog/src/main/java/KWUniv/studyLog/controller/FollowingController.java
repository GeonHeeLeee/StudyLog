package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.FollowingDTO;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.exception.UserNotFoundException;
import KWUniv.studyLog.repository.FollowingRepository;
import KWUniv.studyLog.service.FollowingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FollowingController {

    private final FollowingService followingService;
    private final FollowingRepository followingRepository;

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

    /*
    특정 회원의 팔로잉 리스트
     */
    @GetMapping("/following")
    public ResponseEntity getFollowingList(@RequestParam String selfId) {
        Map<String, Object> response = followingService.getFollowingList(selfId);
        return new ResponseEntity(response, HttpStatus.OK);
    }



    /*
    특정 회원의 팔로워 리스트
     */
    @GetMapping("/follower")
    public ResponseEntity getFollowerList(@RequestParam String followingId) {
        Map<String, Object> response = followingService.getFollowerList(followingId);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
