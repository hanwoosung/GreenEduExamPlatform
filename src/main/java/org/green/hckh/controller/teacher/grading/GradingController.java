package org.green.hckh.controller.teacher.grading;


import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.teacher.grading.GradingScheduleDTO;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;
import org.green.hckh.service.teacher.grading.GradingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grading")
@RequiredArgsConstructor
public class GradingController {

    private final GradingService gradingService;

    @GetMapping("/class/{id}")
    public List<GradingClassEntity> getClassList(@PathVariable String id) {
        // TODO :로그인 완료 시 처리해야함
        return gradingService.findAllByUserId("teacher1");
    }

    @GetMapping("/schedule/{id}")
    public List<GradingScheduleDTO> getSchuduleList(@PathVariable String id) {
        // TODO :로그인 완료 시 처리해야함
        return gradingService.findAllByUserIdScheduleList("teacher1");
    }

}
