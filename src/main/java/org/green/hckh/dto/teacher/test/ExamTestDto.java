package org.green.hckh.dto.teacher.test;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExamTestDto {
    private int testInsertedId;
    private int testNo;
    private int scheduleNo;
    private String createUserId;
    private int cutline;
    private LocalDateTime createDt;
    private LocalDateTime updateDt;
    private int time;
    private LocalDateTime testDt;
    private char deleteYn;
}
