package org.green.hckh.dto.teacher.test;

import lombok.Data;

@Data
public class QuestionDetailDto {
    private int testNo;
    private int questionNo;
    private int questionDetailNo;
    private String questionContent;
    private char correctYn;
}
