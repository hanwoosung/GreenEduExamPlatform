package org.green.hckh.entity.teacher.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleEntity {
    private String scheduleName;
    private Date startDate;
    private Date endDate;
}
