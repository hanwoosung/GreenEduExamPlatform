package org.green.hckh.service.spotmanager;

import org.green.hckh.entity.teacher.schedule.ClassEntity;

import java.util.List;

/**
 * Created on 2024-12-16 by 황승현
 */
public interface ClassService {
    List<ClassEntity> findBySpotNo(int spotNo);
}
