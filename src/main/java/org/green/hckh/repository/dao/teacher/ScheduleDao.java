package org.green.hckh.repository.dao.teacher;


import org.apache.ibatis.annotations.Mapper;
import org.green.hckh.dto.teacher.schedule.ScheduleDto;
import org.green.hckh.entity.teacher.schedule.CalendarEntity;
import org.green.hckh.entity.teacher.schedule.ScheduleEntity;

import java.util.List;

@Mapper
public interface ScheduleDao {
    List<ScheduleEntity> findSubjectList(String id);

    List<CalendarEntity> findCalendarList(String id);

    void insertCalendarEvent(CalendarEntity calendarEntity);

    int maxCountCalendar();

    void updateCalendarEvent(CalendarEntity calendarEntity);

    void deleteCalendarEvent(int calendarNo);

    List<ScheduleEntity> findByClassNo(int classNo);
}
