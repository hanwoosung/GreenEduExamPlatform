package org.green.hckh.controller.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.UserDto;
import org.green.hckh.service.common.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class UserController {

    private final UserService registService;

    //회원가입 아이디 중복체크
    @GetMapping("/regist/cnt/{userId}")
    public int regist(@PathVariable("userId") String userId) {
        return registService.findCntById(userId);
    }

    //회원가입 등록
    @PostMapping("/regist")
    public int regist(@RequestBody UserDto user) {
        return registService.save(user);
    }

    //로그인 결과
    @GetMapping("/loginResult")
    public Map<String, Object> loginResult() {
        System.out.println("aaaaaa");

        Map<String, Object> result = processData(new UserDto());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getPrincipal().equals("anonymousUser")) {
            UserDto user = (UserDto) authentication.getPrincipal();
            result = processData(user);
        }
        return result;
    }

    //로그아웃 결과
    @GetMapping("/logoutResult")
    public String logoutResult() {
        System.out.println("로그아웃 성공");
        return "SUCCESS";
    }

    //회원 정보 수정
    @PutMapping("/user")
    public Map<String,Object> updateUser(@RequestBody UserDto user) {
//        System.out.println(user);
        int result = registService.update(user);

        return processData(user);
    }

    private Map<String,Object> processData(UserDto user){
        Map<String,Object> result = new HashMap<>();

        result.put("userId", user.getUserId());
        result.put("name", user.getName());
        result.put("userBirth", user.getUserBirth());
        result.put("userRoleCode", user.getUserRoleCode());
        result.put("spotNo", user.getSpotNo());
        result.put("spotName", user.getSpotName());
        result.put("deleteYn", user.getDeleteYn());

        return result;
    }

}
