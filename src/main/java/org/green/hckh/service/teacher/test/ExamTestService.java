package org.green.hckh.service.teacher.test;

import org.green.hckh.dto.teacher.test.ExamTestDto;
import org.springframework.stereotype.Service;

public interface ExamTestService {
    int insertTest(ExamTestDto examTestDto);
}
