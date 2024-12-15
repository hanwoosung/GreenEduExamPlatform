package org.green.hckh.entity.teacher.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CalendarEntity {
    private int calendarNo;
    private String userId;
    private String importantYn;
    private String calendarTitle;
    private String calendarContent;
    private Date startDate;
}
