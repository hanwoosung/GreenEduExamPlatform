package org.green.hckh.service.teacher.grading;

import org.green.hckh.dto.teacher.grading.GradingScheduleDTO;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;

import java.util.List;

public interface GradingService {

    List<GradingClassEntity> findAllByUserId(String userId);

    List<GradingScheduleDTO> findAllByUserIdScheduleList(String userId, int num);

}
