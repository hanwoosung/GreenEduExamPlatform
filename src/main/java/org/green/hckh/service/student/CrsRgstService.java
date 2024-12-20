package org.green.hckh.service.student;

import org.green.hckh.dto.student.CrsRgst.ClassDto;

import java.sql.SQLException;
import java.util.List;

public interface CrsRgstService {

    List<ClassDto> getClasses(String userId);

    List<ClassDto> insertClass(String userId, Integer classNo, String startDate) throws Exception;

    List<ClassDto> getApplyStudents(int classNo);

    void updateStatus(ClassDto classDto) throws SQLException;
}
