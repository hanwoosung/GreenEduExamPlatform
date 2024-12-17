package org.green.hckh.controller.spotmanager.teacher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.entity.UserEntity;
import org.green.hckh.service.spotmanager.teacher.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spot-manager/teacher")
@Slf4j
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping("/{spotNo}")
    public List<UserEntity> getTeacher(@PathVariable int spotNo) {
        return teacherService.findTeacherBySpotNo(spotNo);
    }
}
