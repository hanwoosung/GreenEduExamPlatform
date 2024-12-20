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
            try {
                System.out.println("Processing row: " + row);

                // class_no를 가져오고 null 체크
                Object classNoObj = row.get("class_no");
                if (classNoObj == null) {
                    System.err.println("class_no is null for row: " + row);
                    continue;
                }
                int classNo = Integer.parseInt(classNoObj.toString());

                ClassDto classDto = classMap.getOrDefault(classNo, new ClassDto());
                if (classDto.getClassNo() == 0) {
                    classDto.setClassNo(classNo);
                    classDto.setClassName((String) row.getOrDefault("class_name", ""));
                    classDto.setStartDate((Date) row.get("start_date"));
                    classDto.setEndDate((Date) row.get("end_date"));
                    classMap.put(classNo, classDto);
                }

                // schedule_no를 가져오고 null 체크
                Object scheduleNoObj = row.get("schedule_no");
                if (scheduleNoObj == null) {
                    System.err.println("schedule_no is null for row: " + row);
                    continue;
                }
                int scheduleNo = Integer.parseInt(scheduleNoObj.toString());

                Map<Integer, ScheduleDto> classScheduleMap = scheduleMap.getOrDefault(classNo, new HashMap<>());
                ScheduleDto scheduleDto = classScheduleMap.getOrDefault(scheduleNo, new ScheduleDto());
                if (scheduleDto.getScheduleNo() == 0) {
                    scheduleDto.setScheduleNo(scheduleNo);
                    scheduleDto.setScheduleName((String) row.getOrDefault("schedule_name", ""));
                    scheduleDto.setStartDate((Date) row.get("start_date"));
                    scheduleDto.setEndDate((Date) row.get("end_date"));
                    classScheduleMap.put(scheduleNo, scheduleDto);
                    scheduleMap.put(classNo, classScheduleMap);
                }

                TestDto testDto = new TestDto();
                testDto.setTestNo(Integer.parseInt(row.getOrDefault("test_no", "0").toString()));

                // TIMESTAMP -> LocalDateTime 변환
                Object testDt = row.get("test_dt");
                if (testDt instanceof Timestamp) {
                    testDto.setTestDt(((Timestamp) testDt).toLocalDateTime());
                } else if (testDt instanceof LocalDateTime) {
                    testDto.setTestDt((LocalDateTime) testDt);
                } else {
                    System.err.println("Invalid test_dt format for row: " + row);
                    testDto.setTestDt(null);
                }

                testDto.setCutline(Integer.parseInt(row.getOrDefault("cutline", "0").toString()));
                testDto.setScore(Integer.parseInt(row.getOrDefault("score", "0").toString()));

                scheduleDto.getTests().add(testDto);
            } catch (Exception e) {
                System.err.println("Error processing row: " + row);
                e.printStackTrace();
            }
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
