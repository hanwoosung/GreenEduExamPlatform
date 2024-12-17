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

    @GetMapping("/regist/cnt/{userId}")
    public int regist(@PathVariable("userId") String userId) {
        return registService.findCntById(userId);
    }

    @PostMapping("/regist")
    public int regist(@RequestBody UserDto user) {
        return registService.save(user);
    }

    @GetMapping("/loginResult")
    public UserDto loginResult() {

        UserDto result = new UserDto();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getPrincipal().equals("anonymousUser")) {
            result = (UserDto) authentication.getPrincipal();
//            result.put("userName", authentication.getName());
        }
        result.setUserPassword("");

        return result;
    }

    @GetMapping("/logoutResult")
    public String logoutResult() {
        System.out.println("로그아웃 성공");
        return "SUCCESS";
    }

}
