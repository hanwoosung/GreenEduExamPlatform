package org.green.hckh.service.teacher.grading;


import lombok.AllArgsConstructor;
import org.green.hckh.dto.teacher.grading.GradingScheduleDTO;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;
import org.green.hckh.repository.jpa.teacher.GradingRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GradingServiceImpl implements GradingService {

    private final GradingRepository gradingRepository;

    @Override
    public List<GradingClassEntity> findAllByUserId(String userId) {
        return gradingRepository.findAllByUserId(userId);
    }

    @Override
    //TODO: 추후 알아보기
    public List<GradingScheduleDTO> findAllByUserIdScheduleList(String userId) {
        List<Object[]> rawResults = gradingRepository.findAllByUserIdScheduleList(userId);

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

}
