package org.green.hckh.service.student;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.student.testResult.ClassDto;
import org.green.hckh.dto.student.testResult.ScheduleDto;
import org.green.hckh.dto.student.testResult.TestDto;
import org.green.hckh.repository.dao.student.TestResultDao;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TestResultServiceImpl implements TestResultService {

    private final TestResultDao testResultDao;

    @Override
    public List<ClassDto> getTestResult(String userId) {
        List<Map<String, Object>> result = testResultDao.getTestResults(userId);
        return dataParse(result);
    }

    private List<ClassDto> dataParse(List<Map<String, Object>> data) {

        Map<Integer, ClassDto> classMap = new HashMap<>();
        Map<Integer, Map<Integer, ScheduleDto>> scheduleMap = new HashMap<>();
        for (Map<String, Object> row : data) {
            System.out.println(data);

            int classNo = Integer.parseInt(row.get("class_no").toString());


            ClassDto classDto = classMap.getOrDefault(classNo, new ClassDto());
            if (classDto.getClassNo() == 0) {
                classDto.setClassNo(classNo);
                classDto.setClassName((String) row.get("class_name"));
                classDto.setStartDate((Date) row.get("start_date"));
                classDto.setEndDate((Date) row.get("end_date"));
                classMap.put(classNo, classDto);
            }

            int scheduleNo = (int) row.get("schedule_no");

            Map<Integer, ScheduleDto> classScheduleMap = scheduleMap.getOrDefault(classNo, new HashMap<>());
            ScheduleDto scheduleDto = classScheduleMap.getOrDefault(scheduleNo, new ScheduleDto());
            if (scheduleDto.getScheduleNo() == 0) {
                scheduleDto.setScheduleNo(scheduleNo);
                scheduleDto.setScheduleName((String) row.get("schedule_name"));
                scheduleDto.setStartDate((Date) row.get("start_date"));
                scheduleDto.setEndDate((Date) row.get("end_date"));
                classScheduleMap.put(scheduleNo, scheduleDto);
                scheduleMap.put(classNo, classScheduleMap);
            }

            TestDto testDto = new TestDto();
            testDto.setTestNo((int) row.get("test_no"));

            // TIMESTAMP -> LocalDateTime 변환
            Object testDt = row.get("test_dt");
            if (testDt instanceof Timestamp) {
                testDto.setTestDt(((Timestamp) testDt).toLocalDateTime());
            } else {
                testDto.setTestDt((LocalDateTime) testDt);
            }

            testDto.setCutline((int) row.get("cutline"));
            testDto.setScore((int) row.get("score"));

            scheduleDto.getTests().add(testDto);
        }

        // 모든 과목을 각 강의에 추가
        for (Map.Entry<Integer, Map<Integer, ScheduleDto>> entry : scheduleMap.entrySet()) {
            int classNo = entry.getKey();
            List<ScheduleDto> schedules = new ArrayList<>(entry.getValue().values());
            classMap.get(classNo).setSchedules(schedules);
        }

        return new ArrayList<>(classMap.values());
    }
}
