package org.green.hckh.dto.student.test;

import lombok.Data;

@Data
public class TestScoreDto {
    private String userId;
    private int testNo;
    private int score;
    private String confirmYn;
    private int testCnt;
}
