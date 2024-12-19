package org.green.hckh.repository.dao.common;

import org.apache.ibatis.annotations.Mapper;
import org.green.hckh.dto.student.CrsRgst.ClassDto;

/**
 * Created on 2024-12-19 by 황승현
 */
@Mapper
public interface ClassDao {
    ClassDto getClassInfo(int classNo);
}
