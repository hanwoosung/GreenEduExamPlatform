package org.green.hckh.service.student;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.student.CrsRgst.ClassDto;
import org.green.hckh.repository.dao.student.CrsRgstDao;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
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
    public List<ClassDto> insertClass(String userId, int classNo, String startDate) throws SQLException {

        int cnt = crsRgstDao.getClassCnt(userId, classNo);
        if (cnt > 0) {
            throw new SQLException("중복데이터 오류 입니다.");
        }

        //정원체크 남은 인원수 만큼 리턴해줌
        cnt = crsRgstDao.getNowPeopleCnt(classNo);
        if (cnt == 0) {
            throw new SQLException("정원 초과 입니다.");
        }

        //현재 진행 체크 현재 신청한 일자 가져와서 진행중인 강의 여부 체크후 확인해서 비교해서 일자 체크해서 남은 일자 리턴해줌
        cnt = crsRgstDao.chkPossible(userId, startDate);
        if (cnt > 0) {
            throw new SQLException("신청한 일자에 진행중인 과정이 존재합니다.");
        }

        crsRgstDao.insertClass(userId, classNo);

        return crsRgstDao.getClasses(userId);
    }

    @Override
    public List<ClassDto> getApplyStudents(int classNo) {
        return crsRgstDao.getApplyStudents(classNo);
    }

    @Override
    public void updateStatus(ClassDto classDto) throws SQLException {
        if(classDto.getGraduateCode().equals("NO")) {
            //정원체크 남은 인원수 만큼 리턴해줌
            int cnt = crsRgstDao.getNowPeopleCnt(classDto.getClassNo());
            if (cnt == 0) {
                throw new SQLException("정원 초과 입니다.");
            }
        }
        crsRgstDao.updateStatus(classDto.getClassNo(), classDto.getUserId(), classDto.getGraduateCode());
    }

}
