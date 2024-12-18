package org.green.hckh.controller.teacher.grading;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.dto.teacher.grading.GradingDto;
import org.green.hckh.dto.teacher.grading.GradingScheduleDTO;
import org.green.hckh.entity.teacher.grading.GradingClassEntity;
import org.green.hckh.service.teacher.grading.GradingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/grading")
@RequiredArgsConstructor
@Slf4j
public class GradingController {

    private final GradingService gradingService;

    @GetMapping("/class/{id}")
    public List<GradingClassEntity> getClassList(@PathVariable String id) {
        // TODO :로그인 완료 시 처리해야함
        return gradingService.findAllByUserId("teacher1");
    }

    @GetMapping("/schedule/{id}")
    public List<GradingScheduleDTO> getSchuduleList(@PathVariable String id, @RequestParam int num) {
        //TODO : 로그인 완료 시 처리해야함
        return gradingService.findAllByUserIdScheduleList("teacher1", num);
    }

    @GetMapping("/{id}")
    public List<GradingDto> getStudentGradingList(@PathVariable String id, @RequestParam int scheduleNo) {
        return gradingService.findAllGradings("teacher1", scheduleNo);
    }

    @PutMapping("/confirmed")
    public String updateUserConfirmed(@RequestBody List<String> userIdList) {
        gradingService.updateConfirmed(userIdList);
        return "성공";
    }

    @PutMapping("/test")
    public String reTestGo(@RequestBody Map<String, Object> payload) {

        List<String> userIdList = (List<String>) payload.get("userIdList");
        int testNo = Integer.parseInt(payload.get("testNo").toString());

        gradingService.reTestGo(userIdList, testNo);
        return "성공";
    }
}
