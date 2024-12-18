package org.green.hckh.service.student;

import org.green.hckh.dto.student.CrsRgst.ClassDto;

import java.util.List;

public interface CrsRgstService {

    List<ClassDto> getClasses(String userId);

    int insertClass(String userId, String classNo) throws Exception;

}
