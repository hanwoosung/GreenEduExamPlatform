package org.green.hckh.dto.teacher.grading;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * GradingDto
 * - shortAs: 단답형 문제 수
 * - LongAs: 서술형 문제 수
 * - multipleAs: 객관식 문제 수
 * - shortAsCount: 단답형 맞춘 개수
 * - LongAsCount: 서술형 맞춘 개수
 * - multipleAsCount: 객관식 맞춘 개수
 * - userId: 사용자 ID
 * - cutline: 합격 점수 기준선
 * - score: 사용자 시험 점수
 * - userName: 사용자 이름
 * - deleteYn: 사용자 삭제 여부 (Y/N)
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradingDTO {
    private int shortAs;
    private int testNo;
    private int longAs;
    private int multipleAs;
    private int shortAsCount;
    private int longAsCount;
    private int multipleAsCount;
    private String userId;
    private int cutline;
    private double score;
    private String name;
    private String deleteYn;
    private String confirmYn;
    private int testCnt;
    private int isPossibleDetail;
}
