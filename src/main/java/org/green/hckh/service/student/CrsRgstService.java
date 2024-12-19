package org.green.hckh.service.student;

import org.green.hckh.dto.student.CrsRgst.ClassDto;

import java.util.List;

public interface CrsRgstService {

    List<ClassDto> getClasses(String userId);

    List<ClassDto> insertClass(String userId, String classNo, String startDate) throws Exception;

}
