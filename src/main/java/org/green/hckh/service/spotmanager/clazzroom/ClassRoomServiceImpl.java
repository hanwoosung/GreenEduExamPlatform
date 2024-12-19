package org.green.hckh.service.spotmanager.clazzroom;

import lombok.RequiredArgsConstructor;
import org.green.hckh.entity.ClassRoomEntity;
import org.green.hckh.repository.jpa.spotmanager.ClassRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 2024-12-17 by 황승현
 */
@Service
@RequiredArgsConstructor
public class ClassRoomServiceImpl implements ClassRoomService {
    private final ClassRoomRepository classRoomRepository;

    @Override
    public List<ClassRoomEntity> findBySpotNoOrderByClassName(int spotNo) {
        return classRoomRepository.findBySpotNoOrderByRoomName(spotNo);
    }
}
