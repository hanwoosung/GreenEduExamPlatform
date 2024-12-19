package org.green.hckh.controller.student;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.student.testResult.ClassDto;
import org.green.hckh.service.student.TestResultService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/test-result")
@RequiredArgsConstructor
public class TestResultController {

    private final TestResultService testResultService;

    @GetMapping("{userId}")
    public List<ClassDto> getTestResult(@PathVariable("userId") String userId) {
        List<ClassDto> result = testResultService.getTestResult(userId);

        return result;
    }
    
}
