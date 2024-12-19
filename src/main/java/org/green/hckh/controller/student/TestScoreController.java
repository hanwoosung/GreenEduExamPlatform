package org.green.hckh.controller.student;

import org.green.hckh.dto.student.test.TestScoreDto;
import org.green.hckh.repository.dao.student.TestScoreDao;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test-score")
public class TestScoreController {
    private final TestScoreDao testScoreDao;

    public TestScoreController(TestScoreDao testScoreDao) {
        this.testScoreDao = testScoreDao;
    }

    @PostMapping
    public int insert(@RequestBody TestScoreDto testScoreDto) {
        return testScoreDao.insert(testScoreDto);
    }
}
