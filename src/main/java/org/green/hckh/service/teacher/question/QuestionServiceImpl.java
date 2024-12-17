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
        int resultQues = 0;
        int resultDetail = 0;
        for (QuestionDto questionDto : questionList) {
            resultQues += questionDao.insert(questionDto);
            resultDetail += questionDetailDao.insert(questionDto.getQuestionDetailDtoList());
        }
        return resultQues + resultDetail;
    }
}
