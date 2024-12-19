package org.green.hckh.dto.student.test;

import lombok.Data;

@Data
public class QuestionResultDto {
    private int questionResultNo;
    private int testNo;
    private int questionNo;
    private String userId;
    private String answer;
    private String correctYn;
}
