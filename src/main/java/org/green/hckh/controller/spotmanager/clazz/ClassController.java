package org.green.hckh.controller.spotmanager.clazz;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.entity.teacher.schedule.ClassEntity;
import org.green.hckh.service.spotmanager.ClassService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created on 2024-12-16 by 황승현
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spot-manager/class")
@Slf4j
public class ClassController {

    private final ClassService classService;

    @GetMapping("/{spotNo}")
    public List<ClassEntity> getClass(@PathVariable("spotNo") int spotNo) {
        return classService.findBySpotNo(spotNo);
    }
}
