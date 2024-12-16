package org.green.hckh.controller.teacher.test;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.teacher.test.ExamTestDto;
import org.green.hckh.repository.dao.teacher.ExamTestDao;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class ExamTestController {
    private final ExamTestDao examTestDao;

    @GetMapping("")
    public List<ExamTestDto> selectAll() {
        return examTestDao.selectAllTest();
    }

    @GetMapping("/{id}")
    public ExamTestDto selectById(@PathVariable int id) {
        return examTestDao.findById(id);
    }

    @PostMapping("")
    public int insert(@RequestBody ExamTestDto examTestDto) {
        return examTestDao.insertTest(examTestDto);
    }

    @PutMapping("")
    public int update(@RequestBody ExamTestDto examTestDto) {
        return examTestDao.updateTest(examTestDto);
    }

    @DeleteMapping("/{id}")
    public int delete(@PathVariable int id) {
        return examTestDao.deleteTest(id);
    }
}
