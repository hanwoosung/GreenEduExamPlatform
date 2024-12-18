package org.green.hckh.service.student;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.student.CrsRgst.ClassDto;
import org.green.hckh.repository.dao.student.CrsRgstDao;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrsRgstServiceImpl implements CrsRgstService {

    private final CrsRgstDao crsRgstDao;

    @Override
    public List<ClassDto> getClasses(String userId) {
        return crsRgstDao.getClasses(userId);
    }

    @Override
    public int insertClass(String userId, String classNo) {

        int cnt = crsRgstDao.getClassCnt(userId, classNo);

        if (cnt > 0) {
            throw new DuplicateKeyException("중복데이터 오류 입니다.");
        }

        return crsRgstDao.insertClass(userId, classNo);
    }

}
