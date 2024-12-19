package org.green.hckh.dto.teacher.grading;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleTestScoreDto {
    private String scheduleNo;
    private String scheduleName;
    private Date startDate;
    private Date endDate;
    private String name;
    private double avgScore;
}
