package org.green.hckh.controller.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.SpotDto;
import org.green.hckh.service.common.SpotService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/spot")
@RequiredArgsConstructor
public class SpotController {

    private final SpotService spotService;

    @GetMapping("/all")
    public List<SpotDto> spot() {
        return spotService.findAll();
    }


}
