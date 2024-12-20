package org.green.hckh.repository.dao.student;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.student.test.TestScoreDto;

@Mapper
public interface TestScoreDao {
    int insert(@Param("T")TestScoreDto testScoreDto);
}
