package org.green.hckh.dto.teacher.grading;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    // 문제 정보
    private int testNo;
    private int questionNo;
    private String questionTitle;
    private float questionScore;
    private String questionCode;

    // 결과 정보
    private Integer questionResultNo;
    private String userId;
    private String answer;
    private String correctYn;
    private String name;

    // 보기 정보
    private List<QuestionDetailDTO> details;
}
