package org.green.hckh.controller.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.entity.GubnEntity;
import org.green.hckh.repository.jpa.GubnRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
@RestController
@RequestMapping("/api/v1/gubn")
@RequiredArgsConstructor
public class GubnContoller {
    private final GubnRepository gubnRepository;

    @GetMapping
    public List<GubnEntity> getGubnList(@RequestParam String groupCode) {
        return gubnRepository.findAllByGroupCode(groupCode);
    }
}
