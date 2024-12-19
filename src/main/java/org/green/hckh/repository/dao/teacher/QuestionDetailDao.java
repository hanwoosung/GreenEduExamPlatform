package org.green.hckh.repository.dao.teacher;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.test.QuestionDetailDto;

import java.util.List;

@Mapper
public interface QuestionDetailDao {
    int insert(@Param("list") List<QuestionDetailDto> list);
    List<QuestionDetailDto> selectByTestNo(@Param("tno") int tno);
}
