package org.green.hckh.repository.dao.manager;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.manager.TeacherSpotDto;

import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
@Mapper
public interface TeacherSpotDao {

    List<TeacherSpotDto> getTeacherSpots();

    void updateTeacherDeleteYn(@Param("teacherIds") List<String> teacherIds, @Param("deleteYn") String deleteYn);

    void updateTeacherSpotNo(String userId, int spotNo);
}
