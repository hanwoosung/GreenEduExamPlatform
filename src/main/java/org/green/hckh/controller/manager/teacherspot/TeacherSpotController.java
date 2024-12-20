package org.green.hckh.controller.manager.teacherspot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.dto.manager.TeacherSpotDto;
import org.green.hckh.service.manager.teacherspot.TeacherSpotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
@RestController
@RequestMapping("/api/v1/manager/teacher-spot")
@RequiredArgsConstructor
@Slf4j
public class TeacherSpotController {
    private final TeacherSpotService teacherSpotService;

    @GetMapping
    public List<TeacherSpotDto> getTeacherSpots() {
        return teacherSpotService.getTeacherSpots();
    }

    @PutMapping("/{deleteYn}")
    public void updateTeacherDeleteYn(@PathVariable String deleteYn, @RequestBody List<String> teachers) {
//        System.out.println(teachers);
        teacherSpotService.updateTeacherDeleteYn(teachers, deleteYn);
    }

    @PutMapping("/spot/{userId}")
    public void updateTeacherSpotNo(@PathVariable String userId, @RequestParam Integer spotNo) {
        teacherSpotService.updateTeacherSpotNo(userId, spotNo);
    }
}
