package org.green.hckh.service.teacher.grading;


import lombok.AllArgsConstructor;
import org.green.hckh.dto.teacher.grading.*;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;
import org.green.hckh.repository.dao.teacher.GradingDao;
import org.green.hckh.repository.jpa.teacher.GradingRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GradingServiceImpl implements GradingService {

    private final GradingRepository gradingRepository;
    private final GradingDao gradingDao;

    @Override
    public List<GradingClassEntity> findAllByUserId(String userId) {
        return gradingRepository.findAllByUserId(userId);
    }

    @Override
    //TODO: 추후 알아보기
    public List<GradingScheduleDTO> findAllByUserIdScheduleList(String userId, int num) {
        List<Object[]> rawResults = gradingRepository.findAllByUserIdScheduleList(userId, num);

        return rawResults.stream().map(result ->
                GradingScheduleDTO.builder()
                        .id((Integer) result[0])
                        .scheduleName((String) result[1])
                        .startDate((Date) result[2])
                        .endDate((Date) result[3])
                        .deleteYn((Character) result[4])
                        .classNo((Integer) result[5])
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public List<GradingDTO> findAllGradings(String id, int scheduleNo) {
        return gradingDao.findAllGradings(id, scheduleNo);
    }

    @Override
    public void updateConfirmed(List<String> userId) {
        gradingDao.updateConfirmed(userId);
    }

    @Override
    public void reTestGo(List<String> userId, int testNo) {
        gradingDao.deleteUserQuestionResult(userId, testNo);
        gradingDao.updateUserScore(userId, testNo);
    }

    @Override
    public List<QuestionDTO> getQuestionsWithDetails(int testNo, String userId) {
        return gradingDao.getQuestionsWithDetails(testNo, userId);
    }

    @Override
    public void updateUserScore(ScoreDto scoreDto) {
        gradingDao.updateUserQuestionResult(scoreDto.getResultNo(), scoreDto.getCorrect());
        gradingDao.updateGradingUserScore(scoreDto.getUserId(), scoreDto.getTestNo(), scoreDto.getScore());
    }

    @Override
    public List<ScheduleTestScoreDto> scheduleTestAge(String userId) {
        return  gradingDao.scheduleTestAge(userId);
    }
}