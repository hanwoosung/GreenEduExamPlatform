package org.green.hckh.service.manager.teacherspot;

import org.green.hckh.dto.manager.TeacherSpotDto;

import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
public interface TeacherSpotService {
    List<TeacherSpotDto> getTeacherSpots();

    void updateTeacherDeleteYn(List<String> teachers, String deleteYn);

    void updateTeacherSpotNo(String userId, int spotNo);
}
