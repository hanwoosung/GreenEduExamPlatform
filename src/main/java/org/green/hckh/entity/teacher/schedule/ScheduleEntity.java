package org.green.hckh.entity.teacher.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleEntity {
    private int scheduleNo;
    private String scheduleName;
    private Integer classNo;
    private Date startDate;
    private Date endDate;
    private String deleteYn;
}
