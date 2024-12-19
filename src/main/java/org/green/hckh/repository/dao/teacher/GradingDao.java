package org.green.hckh.repository.dao.teacher;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.grading.GradingDTO;
import org.green.hckh.dto.teacher.grading.QuestionDTO;
import org.green.hckh.dto.teacher.grading.ScheduleTestScoreDto;

import java.util.List;

@Mapper
public interface GradingDao {

    List<GradingDTO> findAllGradings(@Param("id") String id, @Param("scheduleNo") int scheduleNo);

    void updateConfirmed(@Param("userIdList") List<String> userId);

    void updateUserScore(@Param("ids") List<String> userId, @Param("testNo") int testNo);

    void deleteUserQuestionResult(@Param("ids") List<String> userId, @Param("testNo") int testNo);

    List<QuestionDTO> getQuestionsWithDetails(@Param("testNo") int testNo, @Param("userId") String userId);

    void updateUserQuestionResult(@Param("resultNo") int resultNo, @Param("correct") String correct);

    void updateGradingUserScore(@Param("userId") String userId, @Param("testNo") int testNo, @Param("score") int score);

    List<ScheduleTestScoreDto> scheduleTestAge(@Param("userId") String userId);

}