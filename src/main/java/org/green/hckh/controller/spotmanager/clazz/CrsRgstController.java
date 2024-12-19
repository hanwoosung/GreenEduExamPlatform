package org.green.hckh.controller.spotmanager.clazz;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.UserDto;
import org.green.hckh.dto.student.CrsRgst.ClassDto;
import org.green.hckh.service.student.CrsRgstService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController("spotManagerCrsController")
@RequestMapping("/api/v1/spot-manager/crs-rgst")
@RequiredArgsConstructor
public class CrsRgstController {

    private final CrsRgstService crsRgstService;

    @GetMapping("{classNo}")
    public List<ClassDto> getApplyStudents(@PathVariable("classNo") int classNo) {
        return crsRgstService.getApplyStudents(classNo);
    }

    @PutMapping
    public void updateStatus(@RequestBody ClassDto classDto) throws SQLException {
        crsRgstService.updateStatus(classDto);
    }

}
