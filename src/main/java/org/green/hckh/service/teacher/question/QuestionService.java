package org.green.hckh.service.teacher.question;

import org.green.hckh.dto.teacher.test.QuestionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {

    public int insertTotalQuestion(List<QuestionDto> questionList);
}
