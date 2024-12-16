package org.green.hckh.controller.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.UserDto;
import org.green.hckh.service.common.regist.RegistService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class RegistController {

    private final RegistService registService;

    @GetMapping("/regist/cnt/{userId}")
    public int regist(@PathVariable("userId") String userId) {
        return registService.findCntById(userId);
    }

    @PostMapping("/regist")
    public int regist(@RequestBody UserDto user) {
        return registService.save(user);
    }

}
