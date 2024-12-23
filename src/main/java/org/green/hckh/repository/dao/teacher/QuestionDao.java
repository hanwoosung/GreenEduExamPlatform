package org.green.hckh.repository.dao.teacher;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.test.QuestionDto;

import java.util.List;

@Mapper
public interface QuestionDao {
    int insert(@Param("list") List<QuestionDto> list);
    int update(@Param("Q")QuestionDto question);
    int delete(@Param("tno")int tno, @Param("qno") int qno);
    List<QuestionDto> selectByTestNo(@Param("tno") int tno);
}
