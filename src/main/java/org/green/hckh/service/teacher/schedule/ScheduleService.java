package org.green.hckh.service.teacher.schedule;

import org.green.hckh.dto.teacher.schedule.CalendarDto;
import org.green.hckh.dto.teacher.schedule.ScheduleDto;
import org.green.hckh.entity.teacher.schedule.ScheduleEntity;

import java.util.List;

public interface ScheduleService {

    List<ScheduleDto> findSubjectList(String id);

    List<CalendarDto> findCalendarList(String id);

    int addCalendarEvent(CalendarDto calendarDto);

    int maxCountCalendar();

    void editCalendarEvent(CalendarDto calendarDto);

    void removeCalendarEvent(int calendarNo);

    List<ScheduleEntity> findByClassNo(int classNo);
}
