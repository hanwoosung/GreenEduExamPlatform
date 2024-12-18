package org.green.hckh.repository.dao.student;

import org.apache.ibatis.annotations.Mapper;
import org.green.hckh.dto.student.CrsRgst.ClassDto;

import java.util.List;

@Mapper
public interface CrsRgstDao {

    List<ClassDto> getClasses(String userId);

    int insertClass(String userId, String classNo);

    int getClassCnt(String userId, String classNo);

}
