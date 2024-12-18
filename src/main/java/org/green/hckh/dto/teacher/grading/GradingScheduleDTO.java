package org.green.hckh.dto.teacher.grading;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradingScheduleDTO {
    private Integer id;
    private String scheduleName;
    private Date startDate;
    private Date endDate;
    private Character deleteYn;
    private Integer classNo;
}
