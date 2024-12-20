package org.green.hckh.repository.dao.student;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.student.test.QuestionResultDto;

import java.util.List;

@Mapper
public interface QuestionResultDao {
    int insert(@Param("list") List<QuestionResultDto> list);
}
