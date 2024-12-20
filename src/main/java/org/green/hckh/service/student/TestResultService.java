package org.green.hckh.service.student;

import org.green.hckh.dto.student.testResult.ClassDto;

import java.util.List;

public interface TestResultService {

    List<ClassDto> getTestResult(String userId);


}
