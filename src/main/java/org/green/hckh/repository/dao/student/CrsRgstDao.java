package org.green.hckh.repository.dao.student;

import org.apache.ibatis.annotations.Mapper;
import org.green.hckh.dto.student.CrsRgst.ClassDto;

import java.util.List;

@Mapper
public interface CrsRgstDao {

    List<ClassDto> getClasses(String userId);

    void insertClass(String userId, int classNo);

    int getClassCnt(String userId, int classNo);

    int getNowPeopleCnt(int classNo);

    int chkPossible(String userId, String startDate);

    List<ClassDto> getApplyStudents(int classNo);

    void updateStatus(int classNo, String userId, String graduateCode);
}
