package org.green.hckh.dto.teacher.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
@Builder
public class ScheduleDto {
    private int no;
    private String title;
    private String content;
    private Date start;
    private Date end;
    private String examYn;
}
