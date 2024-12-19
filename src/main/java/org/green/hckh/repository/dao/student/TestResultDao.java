package org.green.hckh.repository.dao.student;

import org.apache.ibatis.annotations.Mapper;
import org.green.hckh.dto.student.testResult.ClassDto;

import java.util.List;
import java.util.Map;

@Mapper
public interface TestResultDao {

    List<Map<String, Object>> getTestResults(String userId);

}
