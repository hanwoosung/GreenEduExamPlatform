package org.green.hckh.controller.teacher.test;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.teacher.test.QuestionDetailDto;
import org.green.hckh.dto.teacher.test.QuestionDto;
import org.green.hckh.repository.dao.teacher.QuestionDetailDao;
import org.green.hckh.service.teacher.question.QuestionServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/question")
public class QuestionController {

    private final QuestionServiceImpl questionServiceImpl;
    private final QuestionDetailDao questionDetailDao;

    @PostMapping
    public int insert(@RequestBody List<QuestionDto> questions) {
        return questionServiceImpl.insertTotalQuestion(questions);
    }

    @PostMapping("/detail")
    public int detail(@RequestBody List<QuestionDetailDto> question) {
        return questionDetailDao.insert(question);
    }
}
