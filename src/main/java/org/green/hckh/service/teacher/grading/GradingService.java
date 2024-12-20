package org.green.hckh.service.teacher.grading;

import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.grading.*;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;

import java.util.List;

public interface GradingService {

    List<GradingClassEntity> findAllByUserId(String userId);

    List<GradingScheduleDTO> findAllByUserIdScheduleList(String userId, int num);

    List<GradingDTO> findAllGradings(String id, int scheduleNo);

    void updateConfirmed(List<String> userId);

    void reTestGo(List<String> userId,int testNo);

    List<QuestionDTO> getQuestionsWithDetails(int testNo, String userId);

    void updateUserScore(ScoreDto scoreDto);

    List<ScheduleTestScoreDto> scheduleTestAge(String userId);

}
