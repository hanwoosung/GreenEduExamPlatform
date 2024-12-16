package org.green.hckh.controller.teacher.test;

import org.green.hckh.dto.teacher.test.QuestionDto;
import org.green.hckh.service.teacher.question.QuestionServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/question")
public class QuestionController {

    private final QuestionServiceImpl questionServiceImpl;

    public QuestionController(QuestionServiceImpl questionServiceImpl) {
        this.questionServiceImpl = questionServiceImpl;
    }

    @PostMapping("")
    public int insert(@RequestBody List<QuestionDto> questions) {
        return questionServiceImpl.insertTotalQuestion(questions);
    }
}
