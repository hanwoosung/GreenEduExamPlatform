package org.green.hckh.service.teacher.question;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.teacher.test.QuestionDto;
import org.green.hckh.repository.dao.teacher.QuestionDao;
import org.green.hckh.repository.dao.teacher.QuestionDetailDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {


    private final QuestionDao questionDao;
    private final QuestionDetailDao questionDetailDao;

    @Override
    public int insertTotalQuestion(List<QuestionDto> questionList) {
        for (QuestionDto questionDto : questionList) {
            int questionResult = questionDao.insert(questionDto);
            questionDetailDao.insert(questionDto.getQuestionDetailDtoList());
        }
        return 0;
    }
}
