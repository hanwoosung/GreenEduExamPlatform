package org.green.hckh.controller.student;

import org.green.hckh.dto.student.test.QuestionResultDto;
import org.green.hckh.repository.dao.student.QuestionResultDao;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test/result")
public class QuestionResultController {

    private final QuestionResultDao questionResultDao;

    public QuestionResultController(QuestionResultDao questionResultDao) {
        this.questionResultDao = questionResultDao;
    }

    @PostMapping
    public int insert(@RequestBody List<QuestionResultDto> questionResultDto) {
        return questionResultDao.insert(questionResultDto);
    }
}
