package org.green.hckh.dto.student.testResult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestDto {
    private int testNo; // 시험 번호
    private LocalDateTime testDt; // 시험 날짜
    private int score; // 시험 점수
    private int cutline; // 합격 기준 점수
}
