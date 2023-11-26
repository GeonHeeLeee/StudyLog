package KWUniv.studyLog.controller;

import KWUniv.studyLog.DTO.FollowingDTO;
import KWUniv.studyLog.entity.Following;
import KWUniv.studyLog.entity.User;
import KWUniv.studyLog.repository.FollowingRepository;
import KWUniv.studyLog.repository.UserRepository;
import KWUniv.studyLog.service.FollowingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FollowingController {

    private final FollowingRepository followingRepository;
    private final FollowingService followingService;
    private final UserRepository userRepository;

    @PostMapping("/follow")
    @Transactional
    public ResponseEntity followUser(@RequestBody FollowingDTO followingDTO) {
        boolean result = followingService.findSaveFollowingAndSelf(followingDTO);
        return result ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
