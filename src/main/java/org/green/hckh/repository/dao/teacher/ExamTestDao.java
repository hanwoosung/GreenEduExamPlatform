package org.green.hckh.repository.dao.teacher;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.green.hckh.dto.teacher.test.ExamTestDto;
import org.green.hckh.dto.teacher.test.TestByScheduleDto;

import java.util.List;

@Mapper
public interface ExamTestDao {
    int insertTest(@Param("T") ExamTestDto examTestDto);
    List<ExamTestDto> selectAllTest();
    List<TestByScheduleDto> selectTestBySchedule();
    ExamTestDto findById(@Param("id") Integer id);
    int updateTest(@Param("T") ExamTestDto examTestDto);
    int deleteTest(int testNo);
}
