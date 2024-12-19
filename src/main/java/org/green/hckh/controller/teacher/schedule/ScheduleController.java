package org.green.hckh.controller.teacher.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.dto.teacher.schedule.CalendarDto;
import org.green.hckh.dto.teacher.schedule.ScheduleDto;
import org.green.hckh.service.teacher.schedule.ScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/calendar")
@Slf4j
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/schedule/{userId}/{userRoleCode}")
    public List<ScheduleDto> getScheduleList(@PathVariable String userId,
                                             @PathVariable("userRoleCode") String userRoleCode) {
        return scheduleService.findSubjectList(userId, userRoleCode);
    }

    @GetMapping("/{userId}")
    public List<CalendarDto> getCalendarList(@PathVariable String userId) {
        return scheduleService.findCalendarList(userId);
    }

    @PostMapping
    public int addCalendarEvent(@RequestBody CalendarDto calendarDto) {
        System.out.println(calendarDto);
        return scheduleService.addCalendarEvent(calendarDto);
    }

    @PutMapping("/{id}")
    public void editCalendarEvent(@PathVariable int id, @RequestBody CalendarDto calendarDto) {
        calendarDto.setId(id);
        scheduleService.editCalendarEvent(calendarDto);
    }

    @DeleteMapping("/{id}")
    public void removeCalendarEvent(@PathVariable int id) {
        scheduleService.removeCalendarEvent(id);
    }

}
