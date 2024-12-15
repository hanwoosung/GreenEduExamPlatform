package org.green.hckh.dto.teacher.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Data
@Builder
@AllArgsConstructor
public class CalendarDto {
    private int id;
    private String userId;
    private String title;
    private String importantYn;
    private String description;
    private Date start;
}