package org.green.hckh.controller;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.TestDto;
import org.green.hckh.dto.teacher.schedule.ScheduleDto;
import org.green.hckh.repository.dao.TestDao;
import org.green.hckh.service.teacher.schedule.ScheduleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final TestDao testDao;
    private final ScheduleService scheduleService;

    @GetMapping("/")
    public TestDto test() {
        testDao.test();
        return new TestDto("테스트", "테스트2");
    }

    @GetMapping("/2")
    public int test2() {
        return 1;
    }

    @GetMapping("/3")
    public String test3() {
        return "asdassd";
    }

    @GetMapping("/4")
    public List<ScheduleDto> test4() {
        return scheduleService.findSubjectList("teacher1");
    }


}
