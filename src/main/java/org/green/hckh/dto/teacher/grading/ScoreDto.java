package org.green.hckh.dto.teacher.grading;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreDto {
    private int resultNo;
    private int testNo;
    private int score;
    private String userId;
    private String correct;
 }
