package org.green.hckh.service.manager.teacherspot;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.manager.TeacherSpotDto;
import org.green.hckh.repository.dao.manager.TeacherSpotDao;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
@Service
@RequiredArgsConstructor
public class TeacherSpotServiceImpl implements TeacherSpotService {
    private final TeacherSpotDao teacherSpotDao;

    @Override
    public List<TeacherSpotDto> getTeacherSpots() {
        return teacherSpotDao.getTeacherSpots();
    }

    @Override
    public void updateTeacherDeleteYn(List<String> teachers, String deleteYn) {
        teacherSpotDao.updateTeacherDeleteYn(teachers, deleteYn);
    }

    @Override
    public void updateTeacherSpotNo(String userId, int spotNo) {
        teacherSpotDao.updateTeacherSpotNo(userId, spotNo);
    }
}
