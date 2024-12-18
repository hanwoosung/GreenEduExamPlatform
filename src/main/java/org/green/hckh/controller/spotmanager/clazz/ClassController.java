package org.green.hckh.controller.spotmanager.clazz;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.dto.spotmanager.ClassAndSchedulesDTO;
import org.green.hckh.entity.ClassEntity;
import org.green.hckh.entity.ScheduleEntity;
import org.green.hckh.repository.jpa.spotmanager.ClassRepository;
import org.green.hckh.repository.jpa.spotmanager.ScheduleRepository;
import org.green.hckh.service.spotmanager.clazz.ClassService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public void classSchedulesInsertDelete(@RequestBody ClassAndSchedulesDTO classAndSchedulesDTO) {
        System.out.println(classAndSchedulesDTO);
        System.out.println(classAndSchedulesDTO.getScheduleList().toString());
        classService.classSchedulesInsertDelete(classAndSchedulesDTO);
    }
}
