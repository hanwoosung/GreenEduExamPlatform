package org.green.hckh.dto.teacher.grading;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDetailDTO {
    private int questionDetailNo;
    private String questionContent;
    private String correctYn;
}
