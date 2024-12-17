package org.green.hckh.entity.teacher.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleEntity {
    private String scheduleNo;
    private String scheduleName;
    private int classNo;
    private Date startDate;
    private Date endDate;
    private String deleteYn;
}
