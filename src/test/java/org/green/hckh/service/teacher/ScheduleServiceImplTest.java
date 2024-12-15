package org.green.hckh.service.teacher;


import org.green.hckh.entity.teacher.schedule.ScheduleEntity;
import org.green.hckh.service.teacher.schedule.ScheduleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;


@SpringBootTest

public class ScheduleServiceImplTest {

    @Autowired
    private ScheduleService scheduleService;

    @Test
    public void 스케줄들고오기테스트(){
        String userId = "teacher1";
        List<ScheduleEntity> schedules = scheduleService.findSubjectList(userId);
        assertThat(schedules).isNotEmpty();
        System.out.println(schedules);
    }

}
