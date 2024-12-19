package org.green.hckh.controller.manager.spot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.green.hckh.entity.SpotEntity;
import org.green.hckh.repository.jpa.manager.SpotRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created on 2024-12-19 by 황승현
 */
@RestController("managerSpotController")
@RequestMapping("/api/v1/manager/spot")
@RequiredArgsConstructor
@Slf4j
public class SpotController {
    private final SpotRepository spotRepository;

    @GetMapping
    public List<SpotEntity> getAllSpots() {
        return spotRepository.findAllByOrderBySpotNameAsc();
    }

    @PostMapping
    public void insertUpdateRoom(@RequestBody SpotEntity spot) {
        spot.setDeleteYn('N');
        spotRepository.save(spot);
    }

    @Transactional
    @DeleteMapping("/{spotNo}")
    public void deleteClassRoom(@PathVariable int spotNo) {
        spotRepository.updateDeleteYnBySpotNo(spotNo);
    }
}
