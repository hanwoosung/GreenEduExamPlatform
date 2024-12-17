package org.green.hckh.repository.dao.teacher;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.grading.GradingDto;

import java.util.List;

@Mapper
public interface GradingDao {

    List<GradingDto> findAllGradings(@Param("id") String id, @Param("scheduleNo") int scheduleNo);

    void updateConfirmed(@Param("userIdList") List<String> userId);

    void updateUserScore(@Param("ids") List<String> userId, @Param("testNo") int testNo);

    void deleteUserQuestionResult(@Param("ids") List<String> userId, @Param("testNo") int testNo);

}