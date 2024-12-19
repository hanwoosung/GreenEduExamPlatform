package org.green.hckh.service.spotmanager.teacher;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.green.hckh.entity.UserEntity;
import org.green.hckh.repository.jpa.spotmanager.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final TeacherRepository teacherRepository;
    String userRoleCode = "ROLE_TEACHER";

    @Override
    public List<UserEntity> findTeacherBySpotNo(int spotNo) {
        return teacherRepository.findBySpotNoAndUserRoleCodeOrderByName(spotNo, userRoleCode);
    }
}
