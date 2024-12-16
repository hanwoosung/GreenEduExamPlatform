package org.green.hckh.dto.teacher.test;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
    private int testNo;
    private int questionNo;
    private String questionTitle;
    private char questionCode;
    private float questionScore;
    private List<QuestionDetailDto> questionDetailDtoList;
}
