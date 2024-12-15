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

    @GetMapping("/schedule")
    public List<ScheduleDto> getScheduleList() {
        //TODO : 로그인 구현되면 이거 처리
        return scheduleService.findSubjectList("teacher1");
    }

    @GetMapping
    public List<CalendarDto> getCalendarList() {
        //TODO : 로그인 구현되면 이거 처리
        return scheduleService.findCalendarList("teacher1");
    }

    @PostMapping
    public int addCalendarEvent(@RequestBody CalendarDto calendarDto) {
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
