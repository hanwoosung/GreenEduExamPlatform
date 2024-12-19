package org.green.hckh.dto.teacher.test;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TestByScheduleDto {
    private int testNo;
    private int scheduleNo;
    private String scheduleName;
    private LocalDate startDate;
    private LocalDate endDate;
    private int classNo;
    private LocalDateTime testDt;
    private int cutline;
    private int time;
}
