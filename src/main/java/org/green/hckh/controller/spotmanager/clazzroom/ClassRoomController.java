package org.green.hckh.controller.spotmanager.clazzroom;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.entity.ClassRoomEntity;
import org.green.hckh.service.spotmanager.clazzroom.ClassRoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/spot-manager/class-room")
@Slf4j
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    @GetMapping("/{spotNo}")
    public List<ClassRoomEntity> getClassRoom(@PathVariable int spotNo) {
        return classRoomService.findBySpotNoOrderByClassName(spotNo);
    }
}
