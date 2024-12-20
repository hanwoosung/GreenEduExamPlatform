package org.green.hckh.controller.student;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.student.CrsRgst.ClassDto;
import org.green.hckh.service.student.CrsRgstService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/crs-rgst")
@RequiredArgsConstructor
public class CrsRgstController {

    private final CrsRgstService crsRgstService;

    @GetMapping("{userId}")
    public List<ClassDto> crsRgst(@PathVariable("userId") String userId) {
        return crsRgstService.getClasses(userId);
    }

    @PostMapping
    public List<ClassDto> crsRgst(@RequestParam Map<String, Object> params) throws Exception {

        String userId = (String) params.get("userId");
        int classNo = Integer.parseInt(params.get("classNo").toString());
        String startDate = (String) params.get("startDate");

        return crsRgstService.insertClass(userId, classNo, startDate);
    }

}
