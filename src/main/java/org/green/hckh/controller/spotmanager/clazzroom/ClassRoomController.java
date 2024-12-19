package org.green.hckh.controller.spotmanager.clazzroom;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.entity.ClassRoomEntity;
import org.green.hckh.repository.jpa.spotmanager.ClassRoomRepository;
import org.green.hckh.service.spotmanager.clazzroom.ClassRoomService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    private final ClassRoomRepository classRoomRepository;

    @GetMapping("/{spotNo}")
    public List<ClassRoomEntity> getClassRoom(@PathVariable int spotNo) {
        return classRoomService.findBySpotNoOrderByClassName(spotNo);
    }

    @PostMapping
    public void insertUpdateRoom(@RequestBody ClassRoomEntity classRoom) {
        classRoom.setDeleteYn('N');
        classRoomRepository.save(classRoom);
    }

    @Transactional
    @DeleteMapping("/{roomNo}")
    public void deleteClassRoom(@PathVariable int roomNo) {
        classRoomRepository.updateDeleteYnByRoomNo(roomNo);
    }
}
