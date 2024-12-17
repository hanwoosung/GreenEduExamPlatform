package org.green.hckh.service.spotmanager.teacher;

import org.green.hckh.entity.UserEntity;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
public interface TeacherService {
    List<UserEntity> findTeacherBySpotNo(int spotNo);
}
