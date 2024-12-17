package org.green.hckh.service.teacher.schedule;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.teacher.schedule.CalendarDto;
import org.green.hckh.dto.teacher.schedule.ScheduleDto;
import org.green.hckh.entity.teacher.schedule.CalendarEntity;
import org.green.hckh.entity.teacher.schedule.ScheduleEntity;
import org.green.hckh.repository.dao.teacher.ScheduleDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleDao scheduleDao;

    @Override
    public List<ScheduleDto> findSubjectList(String id) {

        List<ScheduleEntity> scheduleEntityList = scheduleDao.findSubjectList(id);

        return scheduleEntityList.stream()
                .map(item -> ScheduleDto.builder()
                        .no(item.getScheduleNo())
                        .title(item.getScheduleName())
                        .start(item.getStartDate())
                        .end(item.getEndDate())
                        .build())
                .toList();
    }

    @Override
    public List<CalendarDto> findCalendarList(String id) {
        List<CalendarEntity> calendarEntityList = scheduleDao.findCalendarList(id);
        return calendarEntityList.stream()
                .map(item -> CalendarDto.builder()
                        .id(item.getCalendarNo())
                        .userId(item.getUserId())
                        .title(item.getCalendarTitle())
                        .importantYn(item.getImportantYn())
                        .description(item.getCalendarContent())
                        .start(item.getStartDate())
                        .build())
                .toList();
    }

    @Override
    public int addCalendarEvent(CalendarDto calendarDto) {
        CalendarEntity calendarEntity = CalendarEntity.builder()
                .userId("teacher1")
                .calendarTitle(calendarDto.getTitle())
                .calendarContent(calendarDto.getDescription())
                .startDate(calendarDto.getStart())
                .importantYn(calendarDto.getImportantYn())
                .build();
        scheduleDao.insertCalendarEvent(calendarEntity);
        return maxCountCalendar();
    }

    @Override
    public void editCalendarEvent(CalendarDto calendarDto) {
        CalendarEntity calendarEntity = CalendarEntity.builder()
                .calendarNo(calendarDto.getId())
                .calendarTitle(calendarDto.getTitle())
                .calendarContent(calendarDto.getDescription())
                .startDate(calendarDto.getStart())
                .importantYn(calendarDto.getImportantYn())
                .build();
        scheduleDao.updateCalendarEvent(calendarEntity);
    }

    @Override
    public void removeCalendarEvent(int calendarNo) {
        scheduleDao.deleteCalendarEvent(calendarNo);
    }

    @Override
    public int maxCountCalendar() {
        return scheduleDao.maxCountCalendar();
    }
}
