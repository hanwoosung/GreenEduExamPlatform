package org.green.hckh.dto.spotmanager;

import lombok.Data;
import org.green.hckh.entity.ClassEntity;
import org.green.hckh.entity.ScheduleEntity;

import java.util.List;

@Data
public class ClassAndSchedulesDTO {
    private ClassEntity classEntity;
    private List<ScheduleEntity> scheduleList;
}