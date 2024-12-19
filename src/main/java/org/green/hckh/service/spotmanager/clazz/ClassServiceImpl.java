package org.green.hckh.service.spotmanager.clazz;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.spotmanager.ClassAndSchedulesDTO;
import org.green.hckh.entity.ClassEntity;
import org.green.hckh.entity.ScheduleEntity;
import org.green.hckh.repository.jpa.spotmanager.ClassRepository;
import org.green.hckh.repository.jpa.spotmanager.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 2024-12-16 by 황승현
 */
@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;
    private final ScheduleRepository scheduleRepository;

    @Override
    public List<ClassEntity> findBySpotNo(int spotNo) {
        return classRepository.findBySpotNo(spotNo).orElse(null);
    }

    @Override
    public void classSchedulesInsertDelete(ClassAndSchedulesDTO classAndSchedulesDTO) {

        ClassEntity classEntity = classAndSchedulesDTO.getClassEntity();
        List<ScheduleEntity> scheduleList = classAndSchedulesDTO.getScheduleList();

        classEntity.setDeleteYn('N');
        int classNo = classRepository.save(classEntity).getClassNo();

        scheduleList.forEach(schedule -> {
            schedule.setClassNo(classNo);
            schedule.setDeleteYn('N');
            scheduleRepository.save(schedule);
        });
    }
}
