package org.green.hckh.service.teacher.grading;

import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.grading.GradingDto;
import org.green.hckh.dto.teacher.grading.GradingScheduleDTO;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;

import java.util.List;

public interface GradingService {

    List<GradingClassEntity> findAllByUserId(String userId);

    List<GradingScheduleDTO> findAllByUserIdScheduleList(String userId, int num);

    List<GradingDto> findAllGradings(String id, int scheduleNo);

    void updateConfirmed(List<String> userId);

    void reTestGo(List<String> userId,int testNo);

}
