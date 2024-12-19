package org.green.hckh.dto.student.testResult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {
    private int scheduleNo; // 과목 번호
    private String scheduleName; // 과목 이름
    private Date startDate; // 과목 시작일
    private Date endDate; // 과목 종료일
    private List<TestDto> tests = new ArrayList<>(); // 시험 목록
}
