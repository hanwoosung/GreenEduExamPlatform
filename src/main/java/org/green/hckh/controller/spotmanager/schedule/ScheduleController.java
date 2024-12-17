package org.green.hckh.controller.spotmanager.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.dto.teacher.schedule.ScheduleDto;
import org.green.hckh.entity.teacher.schedule.ScheduleEntity;
import org.green.hckh.service.teacher.schedule.ScheduleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
@RestController("spotManagerScheduleController")
@RequestMapping("/api/v1/spot-manager/schedule")
@RequiredArgsConstructor
@Slf4j
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/{classNo}")
    public List<ScheduleEntity> getSchedule(@PathVariable int classNo) {
        return scheduleService.findByClassNo(classNo);
    }
}
