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
public class ClassDto {
    private int classNo; // 강의 번호
    private String className; // 강의 이름
    private Date startDate; // 강의 시작일
    private Date endDate; // 강의 종료일
    private List<ScheduleDto> schedules = new ArrayList<>(); // 과목 목록
}
